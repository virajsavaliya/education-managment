'use client';

import { useEffect, useState } from 'react';

const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Navigation between Course List and Curriculum Builder
  const [activeCurriculumCourse, setActiveCurriculumCourse] = useState(null);

  // Drawer state for Course
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Course Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const [price, setPrice] = useState('0');
  const [duration, setDuration] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Delete course confirm state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      } else {
        setError(data.error || 'Failed to load courses');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDrawer = () => {
    setEditingCourse(null);
    setTitle('');
    setCategory('');
    setLevel('BEGINNER');
    setPrice('0');
    setDuration('');
    setThumbnail('');
    setDescription('');
    setIsPublished(false);
    setDrawerOpen(true);
  };

  const openEditDrawer = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setCategory(course.category);
    setLevel(course.level);
    setPrice(String(course.price));
    setDuration(course.duration || '');
    setThumbnail(course.thumbnail || '');
    setDescription(course.description || '');
    setIsPublished(course.isPublished);
    setDrawerOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      title,
      category,
      level,
      price: parseFloat(price) || 0,
      duration,
      thumbnail,
      description,
      isPublished,
    };

    const url = editingCourse ? `/api/admin/courses/${editingCourse.id}` : '/api/admin/courses';
    const method = editingCourse ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setDrawerOpen(false);
        fetchCourses();
      } else {
        setError(data.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed due to network error');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (course) => {
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });
      if (res.ok) {
        setCourses(courses.map(c => c.id === course.id ? { ...c, isPublished: !c.isPublished } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCourses(courses.filter(c => c.id !== id));
        setConfirmDeleteId(null);
      }
    } catch (err) {
      setError('Delete failed');
    }
  };

  // If in Curriculum Builder Mode
  if (activeCurriculumCourse) {
    return (
      <CurriculumBuilder
        course={activeCurriculumCourse}
        onBack={() => {
          setActiveCurriculumCourse(null);
          fetchCourses();
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Create and manage your course catalog.</p>
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
          Add Course
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
        ) : courses.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <i className="fi fi-rr-book-open-reader" style={{ fontSize: 40, color: '#ccd0d0', display: 'block', marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>No Courses Found</h3>
            <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '0 0 16px' }}>Start building your directory by creating your first course.</p>
            <button
              onClick={openCreateDrawer}
              style={{
                background: 'var(--ed-primary-color)', color: '#fff',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}
            >
              Create Course
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Thumbnail</th>
                  <th style={thStyle}>Course Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Level</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Published</th>
                  <th style={thStyle}>Students</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td style={tdStyle}>
                      <img
                        src={course.thumbnail || "/assets/images/course/course-1/1.png"}
                        alt={course.title}
                        style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid var(--ed-border-color)' }}
                      />
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ed-title-color)' }}>
                      {course.title}
                      {course.duration && (
                        <span className="d-inline-flex align-items-center gap-1" style={{ display: 'flex', fontSize: 11, color: 'var(--ed-paragraph-color)', fontWeight: 400, marginTop: 2 }}>
                          <i className="fi fi-rr-clock text-muted" style={{ fontSize: 11 }} /> {course.duration}
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>{course.category}</td>
                    <td style={tdStyle}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                        background: course.level === 'BEGINNER' ? '#dcfce7' : course.level === 'INTERMEDIATE' ? '#e0f2fe' : '#fef3c7',
                        color: course.level === 'BEGINNER' ? '#16a34a' : course.level === 'INTERMEDIATE' ? '#0891b2' : '#d97706',
                      }}>
                        {course.level}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ed-title-color)' }}>
                      {course.price === 0 ? 'Free' : `₹${course.price.toFixed(2)}`}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => togglePublished(course)}
                        style={{
                          border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                          fontSize: 22, color: course.isPublished ? '#16a34a' : '#cbd5e1',
                          lineHeight: 1,
                        }}
                        title={course.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        <i className={course.isPublished ? 'fi fi-rr-toggle-on' : 'fi fi-rr-toggle-off'} />
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 600, color: 'var(--ed-primary-color)' }}>
                        {course._count?.enrollments ?? 0}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                        {/* Syllabus/Curriculum Button */}
                        <button
                          onClick={() => setActiveCurriculumCourse(course)}
                          style={{
                            background: '#ede9fe', border: 'none', borderRadius: 5, padding: '6px 10px',
                            color: 'var(--ed-primary-color)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 4,
                          }}
                          title="Manage Curriculum (Syllabus)"
                        >
                          <i className="fi fi-rr-list" style={{ fontSize: 13 }} />
                          Syllabus
                        </button>

                        <button
                          onClick={() => openEditDrawer(course)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                            color: 'var(--ed-primary-color)', fontSize: 14,
                          }}
                          title="Edit Info"
                        >
                          <i className="fi fi-rr-edit" />
                        </button>
                        {confirmDeleteId === course.id ? (
                          <div style={{ display: 'inline-flex', gap: 4 }}>
                            <button
                              onClick={() => handleDelete(course.id)}
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
                            onClick={() => setConfirmDeleteId(course.id)}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                              color: '#ef4444', fontSize: 14,
                            }}
                            title="Delete Course"
                          >
                            <i className="fi fi-rr-trash" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
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
                {editingCourse ? 'Edit Course Info' : 'Create New Course'}
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
                <label style={labelStyle}>Course Title *</label>
                <input
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  style={inputStyle} placeholder="e.g. Master Web Development"
                />
              </div>

              <div className="row g-2">
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Category *</label>
                  <input
                    type="text" required value={category} onChange={e => setCategory(e.target.value)}
                    style={inputStyle} placeholder="e.g. Development"
                  />
                </div>
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Level *</label>
                  <select
                    value={level} onChange={e => setLevel(e.target.value)}
                    style={inputStyle}
                  >
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Price (₹) *</label>
                  <input
                    type="number" required min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Duration</label>
                  <input
                    type="text" value={duration} onChange={e => setDuration(e.target.value)}
                    style={inputStyle} placeholder="e.g. 15h 30m"
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Thumbnail Image URL</label>
                <input
                  type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)}
                  style={inputStyle} placeholder="https://example.com/image.jpg"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={description} onChange={e => setDescription(e.target.value)}
                  style={{ ...inputStyle, height: 100, resize: 'vertical' }}
                  placeholder="Describe what students will learn..."
                />
              </div>

              <div style={{ ...formGroupStyle, display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <input
                  type="checkbox" id="isPublished" checked={isPublished} onChange={e => setIsPublished(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--ed-primary-color)' }}
                />
                <label htmlFor="isPublished" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                  Publish course immediately
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
                  {submitting ? 'Saving...' : 'Save Course'}
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

// ── Curriculum Builder Component ──
function CurriculumBuilder({ course, onBack }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Chapter editing/creating
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterOrder, setChapterOrder] = useState('0');
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState(null);

  // Lesson Drawer editing/creating
  const [lessonDrawerOpen, setLessonDrawerOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  
  // Lesson form states
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [notesUrl, setNotesUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState('');
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [lessonOrder, setLessonOrder] = useState('0');
  const [lessonSubmitting, setLessonSubmitting] = useState(false);

  // Expanded chapters list (toggling views)
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const fetchCurriculum = async () => {
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/curriculum`);
      const data = await res.json();
      if (data.chapters) {
        setChapters(data.chapters);
        // Default expanding all chapters
        const exp = {};
        data.chapters.forEach(ch => { exp[ch.id] = true; });
        setExpandedChapters(exp);
      } else {
        setError(data.error || 'Failed to load curriculum');
      }
    } catch (e) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const toggleChapterExpand = (id) => {
    setExpandedChapters(v => ({ ...v, [id]: !v[id] }));
  };

  // Chapter handlers
  const handleSaveChapter = async (e) => {
    e.preventDefault();
    if (!chapterTitle.trim()) return;
    setError('');

    const url = editingChapterId 
      ? `/api/admin/courses/${course.id}/curriculum/chapters/${editingChapterId}` 
      : `/api/admin/courses/${course.id}/curriculum`;
    
    const method = editingChapterId ? 'PUT' : 'POST';
    const payload = editingChapterId 
      ? { title: chapterTitle, sortOrder: parseInt(chapterOrder) || 0 }
      : { type: 'chapter', title: chapterTitle, sortOrder: parseInt(chapterOrder) || 0 };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setChapterTitle('');
        setChapterOrder('0');
        setEditingChapterId(null);
        setShowAddChapter(false);
        fetchCurriculum();
      } else {
        const d = await res.json();
        setError(d.error || 'Chapter save failed');
      }
    } catch (err) {
      setError('Connection failure');
    }
  };

  const handleEditChapterStart = (ch) => {
    setEditingChapterId(ch.id);
    setChapterTitle(ch.title);
    setChapterOrder(String(ch.sortOrder));
    setShowAddChapter(true);
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!confirm('Are you sure you want to delete this chapter? All lessons in it will be lost.')) return;
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/curriculum/chapters/${chapterId}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchCurriculum();
    } catch (err) {
      setError('Delete chapter failed');
    }
  };

  // Lesson handlers
  const openCreateLessonDrawer = (chapterId) => {
    setActiveChapterId(chapterId);
    setEditingLesson(null);
    setLessonTitle('');
    setLessonDesc('');
    setVideoUrl('');
    setNotesUrl('');
    setLessonDuration('');
    setIsFreePreview(false);
    
    // Auto-compute next sortOrder
    const chapter = chapters.find(c => c.id === chapterId);
    const count = chapter?.lessons?.length || 0;
    setLessonOrder(String(count));
    
    setLessonDrawerOpen(true);
  };

  const openEditLessonDrawer = (chapterId, lesson) => {
    setActiveChapterId(chapterId);
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonDesc(lesson.description || '');
    setVideoUrl(lesson.videoUrl || '');
    setNotesUrl(lesson.notesUrl || '');
    setLessonDuration(lesson.duration || '');
    setIsFreePreview(lesson.isFreePreview);
    setLessonOrder(String(lesson.sortOrder));
    setLessonDrawerOpen(true);
  };

  const handleSaveLesson = async (e) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;
    setLessonSubmitting(true);
    setError('');

    const url = editingLesson
      ? `/api/admin/courses/${course.id}/curriculum/lessons/${editingLesson.id}`
      : `/api/admin/courses/${course.id}/curriculum`;

    const method = editingLesson ? 'PUT' : 'POST';
    const payload = editingLesson
      ? {
          title: lessonTitle,
          description: lessonDesc,
          videoUrl,
          notesUrl,
          duration: lessonDuration,
          isFreePreview,
          sortOrder: parseInt(lessonOrder) || 0,
        }
      : {
          type: 'lesson',
          chapterId: activeChapterId,
          title: lessonTitle,
          description: lessonDesc,
          videoUrl,
          notesUrl,
          duration: lessonDuration,
          isFreePreview,
          sortOrder: parseInt(lessonOrder) || 0,
        };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setLessonDrawerOpen(false);
        fetchCurriculum();
      } else {
        const d = await res.json();
        setError(d.error || 'Save lesson failed');
      }
    } catch (err) {
      setError('Connection failure');
    } finally {
      setLessonSubmitting(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/curriculum/lessons/${lessonId}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchCurriculum();
    } catch (err) {
      setError('Delete lesson failed');
    }
  };

  return (
    <div>
      {/* Builder Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{
            background: '#fff', border: '1px solid var(--ed-border-color)', borderRadius: 8,
            padding: '10px 18px', color: 'var(--ed-title-color)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          ← Back to Courses
        </button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ed-title-color)', margin: 0, letterSpacing: '-0.3px' }}>
            Curriculum: {course.title}
          </h2>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* Chapters list & Chapter controls */}
      <div className="row g-4">
        
        {/* Left Side: Chapter & Syllabus Builder */}
        <div className="col-lg-8 col-12">
          
          {loading ? (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--ed-border-color)', padding: '60px 0', textAlign: 'center' }}>
              <div className="spinner-border" style={{ color: 'var(--ed-primary-color)' }} role="status" />
            </div>
          ) : chapters.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--ed-border-color)', padding: '60px 40px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <i className="fi fi-rr-list" style={{ fontSize: 40, color: '#cbd5e1', display: 'block', marginBottom: 16 }} />
              <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)' }}>No Chapters added yet</h4>
              <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 14, margin: '0 0 20px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
                Start planning the syllabus structure. Add your first chapter using the control panel on the right.
              </p>
              <button
                onClick={() => setShowAddChapter(true)}
                style={{
                  background: 'var(--ed-primary-color)', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                }}
              >
                + Add Chapter
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {chapters.map((ch, idx) => {
                const isExpanded = expandedChapters[ch.id];
                
                return (
                  <div key={ch.id} style={{
                    background: '#fff', borderRadius: 12, border: '1px solid var(--ed-border-color)',
                    overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.03)',
                    transition: 'all 0.3s ease',
                  }}>
                    {/* Chapter Header */}
                    <div 
                      onClick={() => toggleChapterExpand(ch.id)}
                      style={{
                        padding: '18px 24px', background: '#fafafa', borderBottom: isExpanded ? '1px solid var(--ed-border-color)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f6f6f6'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ed-primary-color)', background: '#ede9fe', padding: '3px 8px', borderRadius: 6 }}>
                          CH {idx + 1}
                        </span>
                        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
                          {ch.title}
                        </h4>
                        <span style={{ fontSize: 11, color: '#64748b', background: '#e2e8f0', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
                          {ch.lessons?.length || 0} Lessons
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleEditChapterStart(ch)}
                          style={{ background: 'none', border: 'none', color: 'var(--ed-primary-color)', padding: 6, cursor: 'pointer', fontSize: 14, borderRadius: 6, transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#ede9fe'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                          title="Edit Chapter Title"
                        >
                          <i className="fi fi-rr-edit" />
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(ch.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', padding: 6, cursor: 'pointer', fontSize: 14, borderRadius: 6, transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                          title="Delete Chapter"
                        >
                          <i className="fi fi-rr-trash" />
                        </button>
                        <span style={{ fontSize: 16, color: '#94a3b8', marginLeft: 4, display: 'inline-block', transition: 'transform 0.2s' }}>
                          {isExpanded ? '▴' : '▾'}
                        </span>
                      </div>
                    </div>

                    {/* Lessons list inside chapter */}
                    {isExpanded && (
                      <div style={{ padding: '20px 24px', background: '#fff' }}>
                        {(!ch.lessons || ch.lessons.length === 0) ? (
                          <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: '8px 0 16px', fontStyle: 'italic' }}>
                            No lessons added in this chapter.
                          </p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                            {ch.lessons.map((lesson, lIdx) => (
                              <div key={lesson.id} style={{
                                padding: 16, borderRadius: 10, border: '1px solid var(--ed-border-color)',
                                background: '#fbfbfb', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                transition: 'all 0.2s',
                              }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.borderColor = 'var(--ed-primary-color)';
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.04)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.borderColor = 'var(--ed-border-color)';
                                  e.currentTarget.style.background = '#fbfbfb';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                                  <div style={{
                                    width: 26, height: 26, borderRadius: '50%', background: '#ede9fe',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ed-primary-color)',
                                    fontWeight: 800, fontSize: 11, flexShrink: 0,
                                  }}>{lIdx + 1}</div>
                                  <div style={{ overflow: 'hidden' }}>
                                    <h5 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>
                                      {lesson.title}
                                    </h5>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                      {lesson.duration && (
                                        <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: 11, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, fontWeight: 500 }}>
                                          <i className="fi fi-rr-clock text-muted" /> {lesson.duration}
                                        </span>
                                      )}
                                      {lesson.videoUrl && (
                                        <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: 11, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                                          <i className="fi fi-rr-play-alt text-success" /> Video Linked
                                        </span>
                                      )}
                                      {lesson.notesUrl && (
                                        <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: 11, color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                                          <i className="fi fi-rr-document-signed text-info" /> Study Notes PDF
                                        </span>
                                      )}
                                      {lesson.isFreePreview && (
                                        <span style={{ fontSize: 10, fontWeight: 700, background: '#fef3c7', color: '#d97706', borderRadius: 4, padding: '2px 8px', letterSpacing: '0.2px' }}>
                                          FREE PREVIEW
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'inline-flex', gap: 6, flexShrink: 0 }}>
                                  <button
                                    onClick={() => openEditLessonDrawer(ch.id, lesson)}
                                    style={{ background: 'none', border: 'none', color: 'var(--ed-primary-color)', padding: 6, cursor: 'pointer', fontSize: 14, borderRadius: 6, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#ede9fe'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    title="Edit Lesson"
                                  >
                                    <i className="fi fi-rr-edit" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLesson(lesson.id)}
                                    style={{ background: 'none', border: 'none', color: '#ef4444', padding: 6, cursor: 'pointer', fontSize: 14, borderRadius: 6, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                    title="Delete Lesson"
                                  >
                                    <i className="fi fi-rr-trash" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => openCreateLessonDrawer(ch.id)}
                          style={{
                            background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: 10,
                            width: '100%', padding: '12px 0', color: 'var(--ed-primary-color)', fontWeight: 700,
                            fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#f5f3ff';
                            e.currentTarget.style.borderColor = 'var(--ed-primary-color)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#f8fafc';
                            e.currentTarget.style.borderColor = '#cbd5e1';
                          }}
                        >
                          <i className="fi fi-rr-plus-small" style={{ fontSize: 18 }} />
                          Add Lesson / Note to this Chapter
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Chapter Controls */}
        <div className="col-lg-4 col-12">
          
          <div style={{
            background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)',
            padding: 24, position: 'sticky', top: 80,
          }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 14px' }}>
              {editingChapterId ? 'Edit Chapter Title' : 'Add Syllabus Chapter'}
            </h4>
            
            <form onSubmit={handleSaveChapter}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Chapter Title *</label>
                <input
                  type="text" required value={chapterTitle} onChange={e => setChapterTitle(e.target.value)}
                  style={inputStyle} placeholder="e.g. Chapter 1: Foundations"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Sort Order Index (Lower index stays first)</label>
                <input
                  type="number" value={chapterOrder} onChange={e => setChapterOrder(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--ed-primary-color)', color: '#fff', border: 'none',
                  borderRadius: 6, width: '100%', padding: '10px 0', fontWeight: 600,
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {editingChapterId ? 'Update Chapter' : 'Add Chapter'}
              </button>

              {editingChapterId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingChapterId(null);
                    setChapterTitle('');
                    setChapterOrder('0');
                  }}
                  style={{
                    background: 'none', border: 'none', color: 'var(--ed-paragraph-color)',
                    width: '100%', padding: '8px 0 0', fontSize: 12, cursor: 'pointer',
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ── Slide-in Lesson Detail Form Drawer ── */}
      {lessonDrawerOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,.4)', display: 'flex', justifyContent: 'flex-end',
        }}>
          <div style={{ flex: 1 }} onClick={() => setLessonDrawerOpen(false)} />

          <aside style={{
            width: '100%', maxWidth: 460, background: '#fff', height: '100vh',
            display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,.15)',
          }}>
            <header style={{
              padding: '16px 24px', borderBottom: '1px solid var(--ed-border-color)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
                {editingLesson ? 'Edit Lesson Details' : 'Add New Lesson'}
              </h3>
              <button
                onClick={() => setLessonDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--ed-paragraph-color)' }}
              >
                ✕
              </button>
            </header>

            <form onSubmit={handleSaveLesson} style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Lesson / Lecture Title *</label>
                <input
                  type="text" required value={lessonTitle} onChange={e => setLessonTitle(e.target.value)}
                  style={inputStyle} placeholder="e.g. 1.1 Course Introduction"
                />
              </div>

              <div className="row g-2">
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Lesson Duration</label>
                  <input
                    type="text" value={lessonDuration} onChange={e => setLessonDuration(e.target.value)}
                    style={inputStyle} placeholder="e.g. 12 mins"
                  />
                </div>
                <div className="col-6" style={formGroupStyle}>
                  <label style={labelStyle}>Sort Order Index</label>
                  <input
                    type="number" value={lessonOrder} onChange={e => setLessonOrder(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Video URL (Vimeo / YouTube / Google Drive)</label>
                <input
                  type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                  style={inputStyle} placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Study Notes PDF / Resource Link</label>
                <input
                  type="url" value={notesUrl} onChange={e => setNotesUrl(e.target.value)}
                  style={inputStyle} placeholder="https://example.com/resources/notes-ch1.pdf"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Lesson Description</label>
                <textarea
                  value={lessonDesc} onChange={e => setLessonDesc(e.target.value)}
                  style={{ ...inputStyle, height: 70, resize: 'vertical' }}
                  placeholder="Provide brief details on what is covered..."
                />
              </div>

              <div style={{ ...formGroupStyle, display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <input
                  type="checkbox" id="isFreePreview" checked={isFreePreview} onChange={e => setIsFreePreview(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--ed-primary-color)' }}
                />
                <label htmlFor="isFreePreview" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                  Enable Free Preview (unregistered users can view this)
                </label>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <button
                  type="submit" disabled={lessonSubmitting}
                  style={{
                    flex: 1, background: 'var(--ed-primary-color)', color: '#fff',
                    border: 'none', borderRadius: 6, padding: '10px 16px',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  {lessonSubmitting ? 'Saving...' : 'Save Lesson'}
                </button>
                <button
                  type="button" onClick={() => setLessonDrawerOpen(false)}
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
