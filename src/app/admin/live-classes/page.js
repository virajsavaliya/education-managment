'use client';

import { useEffect, useState } from 'react';

export default function AdminLiveClassesPage() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseIds, setCourseIds] = useState([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState('60');
  const [meetLink, setMeetLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Delete confirm state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    Promise.all([fetchLiveClasses(), fetchCourses()])
      .finally(() => setLoading(false));
  }, []);

  const fetchLiveClasses = async () => {
    try {
      const res = await fetch('/api/admin/live-classes');
      const data = await res.json();
      if (data.liveClasses) {
        setLiveClasses(data.liveClasses);
      } else {
        setError(data.error || 'Failed to load live classes');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateDrawer = () => {
    setEditingClass(null);
    setTitle('');
    setDescription('');
    setCourseIds([]);
    setScheduledAt('');
    setDuration('60');
    setMeetLink('');
    setIsActive(true);
    setDrawerOpen(true);
  };

  const openEditDrawer = (liveClass) => {
    setEditingClass(liveClass);
    setTitle(liveClass.title);
    setDescription(liveClass.description || '');
    setCourseIds(liveClass.courses ? liveClass.courses.map(c => c.id) : []);
    // Format to YYYY-MM-DDThh:mm for datetime-local
    const dt = new Date(liveClass.scheduledAt);
    const tzOffset = dt.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(dt.getTime() - tzOffset)).toISOString().slice(0, 16);
    setScheduledAt(localISOTime);
    setDuration(String(liveClass.duration));
    setMeetLink(liveClass.meetLink || '');
    setIsActive(liveClass.isActive);
    setDrawerOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      title,
      description,
      courseIds,
      scheduledAt: new Date(scheduledAt).toISOString(),
      duration: parseInt(duration) || 60,
      meetLink,
      isActive,
    };

    const url = editingClass ? `/api/admin/live-classes/${editingClass.id}` : '/api/admin/live-classes';
    const method = editingClass ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setDrawerOpen(false);
        fetchLiveClasses();
      } else {
        setError(data.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed due to network error');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (liveClass) => {
    try {
      const res = await fetch(`/api/admin/live-classes/${liveClass.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !liveClass.isActive }),
      });
      if (res.ok) {
        setLiveClasses(liveClasses.map(l => l.id === liveClass.id ? { ...l, isActive: !l.isActive } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/live-classes/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLiveClasses(liveClasses.filter(l => l.id !== id));
        setConfirmDeleteId(null);
      }
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Schedule and broadcast live learning sessions.</p>
        </div>
        <button
          onClick={openCreateDrawer}
          style={{
            background: 'var(--ed-primary-color)', color: '#fff',
            border: 'none', borderRadius: 6, padding: '10px 18px',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <i className="fi fi-rr-plus-small" style={{ fontSize: 16 }} />
          Schedule Session
        </button>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="spinner-border" style={{ color: 'var(--ed-primary-color)', width: 28, height: 28 }} role="status" />
          </div>
        ) : liveClasses.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <i className="fi fi-rr-video-camera" style={{ fontSize: 40, color: '#ccd0d0', display: 'block', marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>No Live Sessions scheduled</h3>
            <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '0 0 16px' }}>Go ahead and schedule your first virtual class.</p>
            <button
              onClick={openCreateDrawer}
              style={{
                background: 'var(--ed-primary-color)', color: '#fff',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}
            >
              Schedule Session
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Session Title</th>
                  <th style={thStyle}>Linked Course</th>
                  <th style={thStyle}>Date & Time</th>
                  <th style={thStyle}>Duration</th>
                  <th style={thStyle}>Meeting Link</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {liveClasses.map(lc => {
                  const scheduleDate = new Date(lc.scheduledAt);
                  const isUpcoming = scheduleDate > new Date();

                  return (
                    <tr key={lc.id}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ed-title-color)' }}>
                        {lc.title}
                        {lc.description && (
                          <span style={{ display: 'block', fontSize: 11, color: 'var(--ed-paragraph-color)', fontWeight: 400, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                            {lc.description}
                          </span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        {lc.courses && lc.courses.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {lc.courses.map(c => (
                              <span key={c.id} style={{ background: '#ede9fe', color: 'var(--ed-primary-color)', fontWeight: 600, fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>
                                {c.title}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--ed-paragraph-color)', fontSize: 13 }}>General (Unlinked)</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 500 }}>
                          {scheduleDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span style={{ display: 'block', fontSize: 12, color: 'var(--ed-paragraph-color)' }}>
                          {scheduleDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td style={tdStyle}>{lc.duration} mins</td>
                      <td style={tdStyle}>
                        {lc.meetLink ? (
                          <a href={lc.meetLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ed-primary-color)', textDecoration: 'underline', fontSize: 13 }}>
                            Join Class ↗
                          </a>
                        ) : (
                          <span style={{ color: 'var(--ed-paragraph-color)', fontSize: 13 }}>—</span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => toggleActive(lc)}
                          style={{
                            border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                            fontSize: 22, color: lc.isActive ? '#16a34a' : '#cbd5e1',
                            lineHeight: 1,
                          }}
                        >
                          <i className={lc.isActive ? 'fi fi-rr-toggle-on' : 'fi fi-rr-toggle-off'} />
                        </button>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <button
                            onClick={() => openEditDrawer(lc)}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                              color: 'var(--ed-primary-color)', fontSize: 14,
                            }}
                            title="Edit"
                          >
                            <i className="fi fi-rr-edit" />
                          </button>
                          {confirmDeleteId === lc.id ? (
                            <div style={{ display: 'inline-flex', gap: 4 }}>
                              <button
                                onClick={() => handleDelete(lc.id)}
                                style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                style={{ background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(lc.id)}
                              style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                                color: '#ef4444', fontSize: 14,
                              }}
                              title="Delete"
                            >
                              <i className="fi fi-rr-trash" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Slide-in Edit/Create Drawer Overlay ── */}
      {drawerOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,.4)', display: 'flex', justifyContent: 'flex-end',
        }}>
          <div style={{ flex: 1 }} onClick={() => setDrawerOpen(false)} />

          <aside style={{
            width: '100%', maxWidth: 460, background: '#fff', height: '100vh',
            display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,.15)',
          }}>
            <header style={{
              padding: '16px 24px', borderBottom: '1px solid var(--ed-border-color)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
                {editingClass ? 'Edit Live Session' : 'Schedule Live Session'}
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ed-paragraph-color)' }}
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSave} style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Session Title *</label>
                <input
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  style={inputStyle} placeholder="e.g. Q&A and Project Review"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Link to Courses (Select 1 or more)</label>
                <div style={{
                  border: '1px solid var(--ed-border-color)',
                  borderRadius: 6,
                  maxHeight: 150,
                  overflowY: 'auto',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  background: '#fafafa'
                }}>
                  {courses.length === 0 ? (
                    <span style={{ color: 'var(--ed-paragraph-color)', fontSize: 13 }}>No courses available</span>
                  ) : (
                    courses.map(c => {
                      const isChecked = courseIds.includes(c.id);
                      return (
                        <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', margin: 0, fontWeight: 500, color: 'var(--ed-title-color)' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCourseIds([...courseIds, c.id]);
                              } else {
                                setCourseIds(courseIds.filter(id => id !== c.id));
                              }
                            }}
                            style={{ width: 15, height: 15, accentColor: 'var(--ed-primary-color)', cursor: 'pointer' }}
                          />
                          {c.title}
                        </label>
                      );
                    })
                  )}
                </div>
                <span style={{ fontSize: 11, color: 'var(--ed-paragraph-color)', marginTop: 4, display: 'block' }}>
                  Leave all unchecked for a General / Unlinked meeting.
                </span>
              </div>

              <div className="row g-2">
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Date & Time *</label>
                  <input
                    type="datetime-local" required value={scheduledAt} onChange={e => setScheduledAt(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Duration (Minutes) *</label>
                  <input
                    type="number" required min="5" value={duration} onChange={e => setDuration(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Virtual Meeting Link (e.g., Google Meet / Zoom)</label>
                <input
                  type="url" value={meetLink} onChange={e => setMeetLink(e.target.value)}
                  style={inputStyle} placeholder="https://meet.google.com/abc-defg-hij"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={description} onChange={e => setDescription(e.target.value)}
                  style={{ ...inputStyle, height: 80, resize: 'vertical' }}
                  placeholder="Provide details about what will be covered..."
                />
              </div>

              <div style={{ ...formGroupStyle, display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <input
                  type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--ed-primary-color)' }}
                />
                <label htmlFor="isActive" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                  Enable session (students can view and join)
                </label>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <button
                  type="submit" disabled={submitting}
                  style={{
                    flex: 1, background: 'var(--ed-primary-color)', color: '#fff',
                    border: 'none', borderRadius: 6, padding: '10px 16px',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  {submitting ? 'Scheduling...' : 'Save Session'}
                </button>
                <button
                  type="button" onClick={() => setDrawerOpen(false)}
                  style={{
                    background: '#f1f5f9', color: '#475569',
                    border: 'none', borderRadius: 6, padding: '10px 16px',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '12px 16px', fontWeight: 600, fontSize: 13, color: 'var(--ed-paragraph-color)', borderBottom: '1px solid var(--ed-border-color)' };
const tdStyle = { padding: '14px 16px', fontSize: 14, borderBottom: '1px solid var(--ed-border-color)' };

const formGroupStyle = { marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ed-title-color)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid var(--ed-border-color)',
  borderRadius: 6, fontSize: 14, outline: 'none', fontFamily: 'var(--ed-font-family)',
};
