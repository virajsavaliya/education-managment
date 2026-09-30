'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomVideoPlayer({ videoUrl, thumbnail, onComplete }) {
  const containerRef = useRef(null);
  const iframeContainerId = useRef('yt-player-' + Math.random().toString(36).substring(3, 9));
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const hasTriggeredComplete = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Sync onComplete reference to prevent stale closures
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Extract YouTube ID using robust regular expressions (covers Shorts, Embeds, Share, Watch, etc.)
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  // Synchronously control play/pause using imperative player instances
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!playerRef.current) return;
    
    // Ensure playVideo is loaded as a method of the player instance
    if (typeof playerRef.current.playVideo !== 'function') {
      console.warn('YouTube Player instance methods are not ready yet.');
      return;
    }

    // Check current state directly
    let state = -1;
    if (typeof playerRef.current.getPlayerState === 'function') {
      state = playerRef.current.getPlayerState();
    }

    if (state === 1) { // Playing
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setHasStartedPlaying(true);
    }
  };

  const handleSpeedChange = (speed) => {
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(speed);
      setPlaybackSpeed(speed);
    }
  };

  useEffect(() => {
    if (!videoId) return;

    // Reset playback flags on video ID changes
    setIsPlaying(false);
    setIsPlayerReady(false);
    setHasStartedPlaying(false);
    setCurrentTime(0);
    setPlaybackSpeed(1);
    hasTriggeredComplete.current = false;

    // Load YouTube SDK script dynamically if missing
    let sdkLoaded = window.YT;
    if (!sdkLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      // Prevent duplicate initialization on same container
      if (playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player(iframeContainerId.current, {
          videoId: videoId,
          playerVars: {
            controls: 0,        // Hides native controls
            disablekb: 1,       // Disable keyboard controls
            modestbranding: 1,  // Hide YouTube logo as much as possible
            rel: 0,             // Disable related videos
            fs: 0,              // Disable native full screen
            iv_load_policy: 3,  // Hide annotations
            autohide: 1,
            wmode: 'transparent'
          },
          events: {
            onReady: (event) => {
              setDuration(event.target.getDuration());
              event.target.setVolume(volume);
              setIsPlayerReady(true);
            },
            onStateChange: (event) => {
              // event.data codes: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
              if (event.data === 1) {
                setIsPlaying(true);
                setHasStartedPlaying(true);
              } else if (event.data === 2 || event.data === 0 || event.data === -1) {
                setIsPlaying(false);
              }
            }
          }
        });
      } catch (err) {
        console.error('Failed to initialize YT.Player:', err);
      }
    };

    let checkAndInitInterval;
    const checkAndInit = () => {
      if (window.YT && typeof window.YT.Player === 'function') {
        initPlayer();
      } else {
        checkAndInitInterval = setInterval(() => {
          if (window.YT && typeof window.YT.Player === 'function') {
            clearInterval(checkAndInitInterval);
            initPlayer();
          }
        }, 100);
      }
    };

    checkAndInit();

    // Progress update timer - queries state dynamically to avoid stale state closures
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const state = typeof playerRef.current.getPlayerState === 'function' ? playerRef.current.getPlayerState() : -1;
        if (state === 1) { // Playing
          const curTime = playerRef.current.getCurrentTime();
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(curTime);
          setDuration(dur);

          // Auto-completion check when reaching last 15 seconds (or 90% watched for short videos)
          if (dur > 0) {
            const remaining = dur - curTime;
            const isNearEnd = (dur > 30 && remaining <= 15) || (dur <= 30 && curTime / dur >= 0.9);
            if (isNearEnd && !hasTriggeredComplete.current) {
              hasTriggeredComplete.current = true;
              if (onCompleteRef.current) {
                onCompleteRef.current();
              }
            }
          }
        }
      }
    }, 500);


    return () => {
      if (checkAndInitInterval) clearInterval(checkAndInitInterval);
      clearInterval(interval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error(e);
        }
        playerRef.current = null;
      }
    };
  }, [videoId]); // ONLY rebuild when videoId changes! Prevents loops on play/pause clicks.

  // Handle pointer/controls auto-hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const handleSeek = (e) => {
    if (!playerRef.current) return;
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo, true);
    setCurrentTime(seekTo);
  };

  const handleVolumeChange = (e) => {
    if (!playerRef.current) return;
    const newVol = parseInt(e.target.value, 10);
    playerRef.current.setVolume(newVol);
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 50);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === undefined) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If not a YouTube video, fall back to simple iframe
  if (!videoId) {
    return (
      <iframe
        src={videoUrl}
        title="Video Player"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    );
  }

  return (
    <div
      key={videoId} // Triggers full React unmount/remount on lesson change to reset the player instance
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      <style>{`
        /* Dynamic responsive iframe scaling rule */
        .yt-iframe-wrapper iframe {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border: none !important;
          pointer-events: none !important;
        }

        /* Clean range slider resets to completely strip default outline borders and gray boxes */
        .custom-seek-bar, .custom-volume-bar {
          -webkit-appearance: none !important;
          appearance: none !important;
          border: none !important;
          border-width: 0 !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
          height: 4px !important;
          border-radius: 2px !important;
          cursor: pointer !important;
        }

        /* Chrome/Safari track overrides */
        .custom-seek-bar::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
          border: none !important;
        }
        .custom-volume-bar::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
          border: none !important;
        }

        /* Firefox track overrides */
        .custom-seek-bar::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          border: none !important;
        }
        .custom-volume-bar::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          border: none !important;
        }

        /* Thumb WebKit overrides to render a smooth white dot */
        .custom-seek-bar::-webkit-slider-thumb {
          -webkit-appearance: none !important;
          appearance: none !important;
          height: 12px;
          width: 12px;
          border-radius: 50% !important;
          background: #ffffff !important;
          margin-top: -4px !important;
          border: none !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.8) !important;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .custom-seek-bar:hover::-webkit-slider-thumb {
          opacity: 1;
        }

        .custom-volume-bar::-webkit-slider-thumb {
          -webkit-appearance: none !important;
          appearance: none !important;
          height: 10px;
          width: 10px;
          border-radius: 50% !important;
          background: #ffffff !important;
          margin-top: -3px !important;
          border: none !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
        }

        /* Thumb Firefox overrides */
        .custom-seek-bar::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50% !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.8) !important;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .custom-seek-bar:hover::-moz-range-thumb {
          opacity: 1;
        }
        .custom-volume-bar::-moz-range-thumb {
          height: 10px;
          width: 10px;
          border-radius: 50% !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
        }
      `}</style>

      {/* 1. YouTube IFrame Container: Positioned at 100% to ensure slides/text are fully visible and not cut off */}
      <div style={{ width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', position: 'relative' }}>
        <div 
          className="yt-iframe-wrapper"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <div id={iframeContainerId.current} />
        </div>
      </div>

      {/* 2. Custom Video Thumbnail Placeholder Cover (Prevents viewing YouTube's native loader and big red play button) */}
      {!hasStartedPlaying && (
        <div 
          onClick={isPlayerReady ? togglePlay : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#111827',
            zIndex: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isPlayerReady ? 'pointer' : 'default'
          }}
        >
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt="Lecture Thumbnail" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} 
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
              <i className="fi fi-rr-play-alt" style={{ fontSize: 44, color: 'var(--ed-primary-color)' }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Click to play lecture</span>
            </div>
          )}
        </div>
      )}

      {/* 3. Transparent Interactive Cover (Prevents clicks to YouTube redirection) */}
      <div
        onClick={isPlayerReady ? togglePlay : undefined}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '70px', // Lifted higher to protect volume/progress hover space
          cursor: isPlayerReady ? 'pointer' : 'default',
          zIndex: 10
        }}
      />

      {/* 4. Custom Full-Width Edge Controls Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          padding: '24px 20px 12px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
          opacity: showControls ? 1 : 0,
          transform: showControls ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Row 1: Seek bar spanning full width of controls */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 4px', margin: '2px 0 8px 0' }}>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="custom-seek-bar"
            style={{
              flex: 1,
              background: `linear-gradient(to right, #ffffff ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`,
            }}
          />
        </div>

        {/* Row 2: Control buttons and Time layout */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Left control block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              disabled={!isPlayerReady}
              style={{
                background: 'none',
                border: 'none',
                color: isPlayerReady ? '#fff' : '#64748b',
                cursor: isPlayerReady ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isPlaying ? (
                <i className="fi fi-rr-pause" style={{ fontSize: '16px' }} />
              ) : (
                <i className="fi fi-rr-play" style={{ fontSize: '16px' }} />
              )}
            </button>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={toggleMute}
                disabled={!isPlayerReady}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isPlayerReady ? '#fff' : '#64748b',
                  cursor: isPlayerReady ? 'pointer' : 'default',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {isMuted ? (
                  <i className="fi fi-rr-volume-mute" style={{ fontSize: '14px' }} />
                ) : volume > 50 ? (
                  <i className="fi fi-rr-volume-up" style={{ fontSize: '14px' }} />
                ) : (
                  <i className="fi fi-rr-volume-down" style={{ fontSize: '14px' }} />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                disabled={!isPlayerReady}
                className="custom-volume-bar"
                style={{
                  width: '65px',
                  background: `linear-gradient(to right, #ffffff ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%)`,
                }}
              />
            </div>

            {/* Time Counter: formats '03:54 / 04:04' next to play controls */}
            <div style={{ color: '#fff', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 500, opacity: 0.9, marginLeft: '6px' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right control block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Speed Control Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <select
                value={playbackSpeed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                disabled={!isPlayerReady}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isPlayerReady ? '#fff' : '#64748b',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: isPlayerReady ? 'pointer' : 'default',
                  outline: 'none',
                  padding: '2px 4px',
                }}
              >
                <option value="0.5" style={{ background: '#0f172a', color: '#fff' }}>0.5x</option>
                <option value="1" style={{ background: '#0f172a', color: '#fff' }}>1.0x</option>
                <option value="1.25" style={{ background: '#0f172a', color: '#fff' }}>1.25x</option>
                <option value="1.5" style={{ background: '#0f172a', color: '#fff' }}>1.5x</option>
                <option value="2" style={{ background: '#0f172a', color: '#fff' }}>2.0x</option>
              </select>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              disabled={!isPlayerReady}
              style={{
                background: 'none',
                border: 'none',
                color: isPlayerReady ? '#fff' : '#64748b',
                cursor: isPlayerReady ? 'pointer' : 'default',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={e => { if (isPlayerReady) e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isFullscreen ? (
                <i className="fi fi-rr-compress-alt" style={{ fontSize: '15px' }} />
              ) : (
                <i className="fi fi-rr-expand-arrows-alt" style={{ fontSize: '15px' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Center Play Button / Spinner overlay (before playback starts) */}
      {!hasStartedPlaying && (
        <div
          onClick={isPlayerReady ? togglePlay : undefined}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: isPlayerReady ? 'pointer' : 'default',
            zIndex: 15,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
          onMouseEnter={e => {
            if (isPlayerReady) {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
            }
          }}
          onMouseLeave={e => {
            if (isPlayerReady) {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.65)';
            }
          }}
        >
          {isPlayerReady ? (
            <i className="fi fi-rr-play" style={{ fontSize: '22px', marginLeft: '4px' }} />
          ) : (
            <div className="spinner-border text-light" role="status" style={{ width: '22px', height: '22px', borderWidth: '2px' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
