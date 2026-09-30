'use client';

import { useEffect, useState } from 'react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  
  // Filter by course
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  // Expanded student detail state
  const [expandedId, setExpandedId] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Delete confirm state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmTerminateCourseId, setConfirmTerminateCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [search, selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error('Failed to load courses', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/admin/students?search=${encodeURIComponent(search)}&courseId=${selectedCourseId}`);
      const data = await res.json();
      if (data.students) {
        setStudents(data.students);
      } else {
        setError(data.error || 'Failed to load students');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (studentId) => {
    if (expandedId === studentId) {
      // Toggle off
      setExpandedId(null);
      setStudentDetails(null);
      return;
    }

    setExpandedId(studentId);
    setLoadingDetail(true);
    setStudentDetails(null);
    setConfirmTerminateCourseId(null); // Reset confirm state

    try {
      const res = await fetch(`/api/admin/students/${studentId}`);
      const data = await res.json();
      if (data.student) {
        setStudentDetails(data.student);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleTerminateEnrollment = async (studentId, courseId) => {
    try {
      const res = await fetch(`/api/admin/students/enrollments?userId=${studentId}&courseId=${courseId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        // Update local student details state to remove the terminated enrollment
        if (studentDetails && studentDetails.id === studentId) {
          setStudentDetails({
            ...studentDetails,
            enrollments: studentDetails.enrollments.filter(e => e.courseId !== courseId)
          });
        }
        // Update the main students list item's enrollment count
        setStudents(students.map(s => {
          if (s.id === studentId) {
            return {
              ...s,
              _count: {
                ...s._count,
                enrollments: Math.max(0, (s._count?.enrollments ?? 1) - 1)
              }
            };
          }
          return s;
        }));
        setConfirmTerminateCourseId(null);
      } else {
        setError('Failed to terminate enrollment');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent toggling row expand
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setStudents(students.filter(s => s.id !== id));
        if (expandedId === id) {
          setExpandedId(null);
          setStudentDetails(null);
        }
        setConfirmDeleteId(null);
      } else {
        setError('Delete failed');
      }
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>
            {selectedCourseId 
              ? `Enrolled Students (${students.length})` 
              : 'All Registered Students'}
          </h2>
          <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 13 }}>
            {selectedCourseId 
              ? `Displaying students currently enrolled in "${courses.find(c => c.id === selectedCourseId)?.title || ''}".`
              : 'Monitor student enrollment profiles and course progress.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%', maxWidth: 620, justifyContent: 'flex-end' }}>
          {/* Course filter select */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 280 }}>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              style={{
                width: '100%', padding: '8px 36px 8px 12px',
                border: '1px solid var(--ed-border-color)', borderRadius: 6,
                fontSize: 13.5, outline: 'none', background: '#fff',
                appearance: 'none', cursor: 'pointer', color: 'var(--ed-title-color)',
                fontWeight: 500
              }}
            >
              <option value="">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <i className="fi fi-rr-angle-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 12, pointerEvents: 'none' }} />
          </div>

          {/* Search filter input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 280 }}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '8px 12px 8px 34px',
                border: '1px solid var(--ed-border-color)', borderRadius: 6,
                fontSize: 13.5, outline: 'none',
              }}
            />
            <i className="fi fi-rr-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }} />
          </div>
        </div>
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
        ) : students.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <i className="fi fi-rr-users-alt" style={{ fontSize: 40, color: '#ccd0d0', display: 'block', marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>No Students Found</h3>
            <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: 0 }}>
              {search ? 'Try adjusting your search criteria.' : 'No student accounts are currently registered.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={thStyle}>Student Info</th>
                  <th style={thStyle}>Contact Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Enrolled Courses</th>
                  <th style={thStyle}>Registered</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => {
                  const isExpanded = expandedId === student.id;
                  
                  return (
                    <tr key={student.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(student.id)}>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'var(--ed-primary-color)', color: '#fff',
                            fontWeight: 700, fontSize: 12,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--ed-title-color)', display: 'block' }}>{student.name}</span>
                            <span style={{ fontSize: 11, color: 'var(--ed-primary-color)', fontWeight: 500 }}>
                              {isExpanded ? 'Hide enrollments ▴' : 'View enrollments ▾'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>{student.email}</td>
                      <td style={tdStyle}>{student.phone || '—'}</td>
                      <td style={tdStyle}>
                        <span style={{
                          background: '#ede9fe', color: 'var(--ed-primary-color)',
                          fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        }}>
                          {student._count?.enrollments ?? 0}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, color: 'var(--ed-paragraph-color)', fontSize: 13 }}>
                        {new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        {confirmDeleteId === student.id ? (
                          <div style={{ display: 'inline-flex', gap: 4 }}>
                            <button
                              onClick={(e) => handleDelete(student.id, e)}
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
                            onClick={() => setConfirmDeleteId(student.id)}
                            style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
                              color: '#ef4444', fontSize: 14,
                            }}
                            title="Delete Student"
                          >
                            <i className="fi fi-rr-trash" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Expanded enrollments drawer/sub-section */}
      {expandedId && (
        <div style={{
          marginTop: 20, background: '#fff', borderRadius: 10,
          border: '1px solid var(--ed-border-color)', padding: '20px 24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: 0 }}>
              Course Enrollments for {studentDetails ? studentDetails.name : 'Student'}
            </h4>
            <button
              onClick={() => { setExpandedId(null); setStudentDetails(null); }}
              style={{ background: 'none', border: 'none', color: 'var(--ed-paragraph-color)', cursor: 'pointer', fontSize: 13 }}
            >
              Close Details ✕
            </button>
          </div>

          {loadingDetail ? (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div className="spinner-border spinner-border-sm" style={{ color: 'var(--ed-primary-color)' }} role="status" />
            </div>
          ) : !studentDetails || studentDetails.enrollments.length === 0 ? (
            <p style={{ color: 'var(--ed-paragraph-color)', fontSize: 13, margin: 0 }}>
              This student has not enrolled in any courses yet.
            </p>
          ) : (
            <div className="row g-3">
              {studentDetails.enrollments.map(enr => (
                <div className="col-md-6 col-12" key={enr.id}>
                  <div style={{
                    padding: '14px 18px', borderRadius: 8, border: '1px solid var(--ed-border-color)',
                    background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {enr.course.title}
                      </h5>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--ed-paragraph-color)' }}>
                          {enr.course.category} • {enr.course.level}
                        </span>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4,
                          background: enr.course.isPublished ? '#dcfce7' : '#fee2e2',
                          color: enr.course.isPublished ? '#16a34a' : '#ef4444',
                        }}>
                          {enr.course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Terminate Access Button */}
                    <div style={{ flexShrink: 0 }}>
                      {confirmTerminateCourseId === enr.course.id ? (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            onClick={() => handleTerminateEnrollment(studentDetails.id, enr.course.id)}
                            style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px', fontSize: 10, fontWeight: 700 }}
                          >
                            Yes, Terminate
                          </button>
                          <button
                            onClick={() => setConfirmTerminateCourseId(null)}
                            style={{ background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 4, padding: '4px 8px', fontSize: 10 }}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmTerminateCourseId(enr.course.id)}
                          style={{
                            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6,
                            padding: '6px 10px', color: '#dc2626', fontSize: 11, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 4
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; }}
                          title="Terminate Student Access"
                        >
                          <i className="fi fi-rr-ban" style={{ fontSize: 12 }} /> Terminate Access
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: '12px 16px', fontWeight: 600, fontSize: 13, color: 'var(--ed-paragraph-color)', borderBottom: '1px solid var(--ed-border-color)' };
const tdStyle = { padding: '14px 16px', fontSize: 14, borderBottom: '1px solid var(--ed-border-color)' };
