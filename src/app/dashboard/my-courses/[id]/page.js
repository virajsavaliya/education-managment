'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';

export default function StudentClassroomPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState(new Set());
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Expanded chapters list state
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    fetchSyllabus();
  }, [id]);

  const fetchSyllabus = async () => {
    try {
      const res = await fetch(`/api/student/courses/${id}`);
      const data = await res.json();
      if (res.ok) {
        setCourse(data.course);
        setCompletedLessonIds(new Set(data.completedLessonIds || []));
        
        // Auto-expand all chapters initially
        const exp = {};
        data.course.chapters.forEach(ch => { exp[ch.id] = true; });
        setExpandedChapters(exp);

        // Auto-select first lesson if available
        if (data.course.chapters.length > 0) {
          const firstCh = data.course.chapters[0];
          if (firstCh.lessons && firstCh.lessons.length > 0) {
            setActiveLesson(firstCh.lessons[0]);
          }
        }
      } else {
        setError(data.error || 'Failed to load classroom syllabus');
      }
    } catch (err) {
      setError('Connection failure');
    } finally {
      setLoading(false);
    }
  };

  const toggleChapterExpand = (chId) => {
    setExpandedChapters(v => ({ ...v, [chId]: !v[chId] }));
  };

  const handleToggleProgress = async (lessonId, currentCompleted, e) => {
    if (e) e.stopPropagation(); // Avoid triggering active lesson click

    try {
      const res = await fetch(`/api/student/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !currentCompleted }),
      });
      if (res.ok) {
        setCompletedLessonIds(prev => {
          const next = new Set(prev);
          if (currentCompleted) next.delete(lessonId);
          else next.add(lessonId);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAutoComplete = async (lessonId) => {
    if (completedLessonIds.has(lessonId)) return;

    try {
      const res = await fetch(`/api/student/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });
      if (res.ok) {
        setCompletedLessonIds(prev => {
          const next = new Set(prev);
          next.add(lessonId);
          return next;
        });
      }
    } catch (err) {
      console.error('Failed to auto complete:', err);
    }
  };

  const handleNextLesson = () => {
    if (!course || !activeLesson) return;
    
    // Flatten all lessons across chapters to find the next item index
    const flatLessons = [];
    course.chapters.forEach(ch => {
      if (ch.lessons) flatLessons.push(...ch.lessons);
    });

    const currIdx = flatLessons.findIndex(l => l.id === activeLesson.id);
    if (currIdx !== -1 && currIdx < flatLessons.length - 1) {
      setActiveLesson(flatLessons[currIdx + 1]);
    }
  };

  // Convert standard YouTube watch URLs to embed links
  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtube.com')) {
        const v = parsed.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}`;
      } else if (parsed.hostname.includes('youtu.be')) {
        const v = parsed.pathname.slice(1);
        if (v) return `https://www.youtube.com/embed/${v}`;
      } else if (parsed.hostname.includes('vimeo.com')) {
        const v = parsed.pathname.split('/').pop();
        if (v) return `https://player.vimeo.com/video/${v}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  if (loading) {
    return (
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 60, textAlign: 'center' }}>
        <div className="spinner-border" style={{ color: 'var(--ed-primary-color)' }} role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#fee2e2', color: '#dc2626', padding: 24, borderRadius: 10, textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px', fontWeight: 700 }}>Classroom Error</h4>
        <p style={{ margin: '0 0 16px', fontSize: 14 }}>{error}</p>
        <Link href="/dashboard/my-courses" className="ed-btn btn-sm">Back to Courses</Link>
      </div>
    );
  }

  const isCompleted = activeLesson ? completedLessonIds.has(activeLesson.id) : false;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <Link href="/dashboard/my-courses" style={{
          textDecoration: 'none', color: 'var(--ed-title-color)', fontWeight: 600, fontSize: 13,
          background: '#fff', border: '1px solid var(--ed-border-color)', borderRadius: 6, padding: '8px 14px',
        }}>
          ← Back to Courses
        </Link>
        <h2 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
          {course.title}
        </h2>
      </div>

      <div className="row g-4">
        {/* Left Side: Video Player Area */}
        <div className="col-lg-8 col-12">
          {activeLesson ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              
              {/* Embedded Player Frame */}
              <div style={{
                background: '#000', borderRadius: 10, overflow: 'hidden',
                aspectRatio: '16/9', position: 'relative', border: '1px solid var(--ed-border-color)',
              }}>
                {activeLesson.videoUrl ? (
                  <CustomVideoPlayer 
                    key={activeLesson.id} 
                    videoUrl={activeLesson.videoUrl} 
                    thumbnail={course.thumbnail} 
                    onComplete={() => handleAutoComplete(activeLesson.id)}
                  />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 24, textAlign: 'center',
                  }}>
                    <i className="fi fi-rr-video-camera-off" style={{ fontSize: 44, color: 'rgba(255,255,255,.4)', marginBottom: 12 }} />
                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>No video linked to this lesson</h4>
                    <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, maxWidth: 300, margin: 0 }}>
                      Check study notes/resources for this section below.
                    </p>
                  </div>
                )}
              </div>

              {/* Lesson Metadata */}
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 2px' }}>
                      {activeLesson.title}
                    </h3>
                    {activeLesson.duration && (
                      <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: 12, color: 'var(--ed-paragraph-color)' }}>
                        <i className="fi fi-rr-clock text-muted" style={{ fontSize: 13 }} /> Duration: {activeLesson.duration}
                      </span>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {activeLesson.notesUrl && (
                      <a href={activeLesson.notesUrl} target="_blank" rel="noopener noreferrer" style={{
                        background: '#ede9fe', color: 'var(--ed-primary-color)',
                        borderRadius: 6, padding: '8px 14px', textDecoration: 'none',
                        fontWeight: 600, fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}>
                        <i className="fi fi-rr-document" />
                        Download Notes / Resources
                      </a>
                    )}
                    <button
                      onClick={(e) => handleToggleProgress(activeLesson.id, isCompleted, e)}
                      style={{
                        background: isCompleted ? '#16a34a' : 'var(--ed-primary-color)', color: '#fff',
                        border: 'none', borderRadius: 6, padding: '8px 14px',
                        fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      <i className={isCompleted ? 'fi fi-rr-checkbox' : 'fi fi-rr-square'} />
                      {isCompleted ? 'Completed' : 'Mark as Completed'}
                    </button>
                    <button
                      onClick={handleNextLesson}
                      style={{
                        background: '#f1f5f9', color: '#475569',
                        border: 'none', borderRadius: 6, padding: '8px 14px',
                        fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--ed-border-color)', paddingTop: 14 }}>
                  <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                    {activeLesson.description || 'No description provided for this lesson.'}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 60, textAlign: 'center' }}>
              <i className="fi fi-rr-book-open-reader" style={{ fontSize: 40, color: '#cbd5e1', display: 'block', marginBottom: 12 }} />
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>Syllabus is empty</h4>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '4px 0 0' }}>No lessons are currently linked to this course.</p>
            </div>
          )}
        </div>

        {/* Right Side: Chapter/Lectures Playlist */}
        <div className="col-lg-4 col-12">
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: '20px 16px' }}>
            <h4 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 16px', paddingLeft: 4 }}>
              Course Syllabus
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {course.chapters.map((ch, idx) => {
                const isExpanded = expandedChapters[ch.id];
                
                return (
                  <div key={ch.id} style={{
                    borderRadius: 8, border: '1px solid var(--ed-border-color)',
                    overflow: 'hidden',
                  }}>
                    {/* Chapter Header Link */}
                    <div
                      onClick={() => toggleChapterExpand(ch.id)}
                      style={{
                        padding: '10px 12px', background: '#fafafa', borderBottom: isExpanded ? '1px solid var(--ed-border-color)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                      }}
                    >
                      <div style={{ overflow: 'hidden', marginRight: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ed-primary-color)', display: 'block', textTransform: 'uppercase' }}>
                          Chapter {idx + 1}
                        </span>
                        <h5 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ch.title}
                        </h5>
                      </div>
                      <span style={{ fontSize: 14, color: '#94a3b8' }}>
                        {isExpanded ? '▴' : '▾'}
                      </span>
                    </div>

                    {/* Lesson Items Playlist */}
                    {isExpanded && (
                      <div style={{ background: '#fff' }}>
                        {(!ch.lessons || ch.lessons.length === 0) ? (
                          <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 12, margin: '8px 12px', fontStyle: 'italic' }}>
                            Empty chapter
                          </p>
                        ) : (
                          ch.lessons.map(les => {
                            const isCompleted = completedLessonIds.has(les.id);
                            const isActive = activeLesson?.id === les.id;
                            
                            return (
                              <div
                                key={les.id}
                                onClick={() => setActiveLesson(les)}
                                style={{
                                  padding: '10px 12px', borderBottom: '1px solid #f1f5f9',
                                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                                  background: isActive ? '#f5f3ff' : 'transparent',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#fafafa'; }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                              >
                                {/* Completion Checkbox */}
                                <button
                                  onClick={(e) => handleToggleProgress(les.id, isCompleted, e)}
                                  style={{
                                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                                    color: isCompleted ? '#16a34a' : '#cbd5e1', fontSize: 18,
                                    lineHeight: 1, display: 'flex', alignItems: 'center',
                                  }}
                                >
                                  <i className={isCompleted ? 'fi fi-rr-checkbox' : 'fi fi-rr-square'} />
                                </button>
                                
                                <div style={{ overflow: 'hidden', flex: 1 }}>
                                  <h6 style={{
                                    fontSize: 12.5, margin: 0, lineHeight: 1.4,
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? 'var(--ed-primary-color)' : 'var(--ed-title-color)',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                  }}>
                                    {les.title}
                                  </h6>
                                  {les.duration && (
                                    <span style={{ fontSize: 10, color: 'var(--ed-paragraph-color)' }}>
                                      {les.duration}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
