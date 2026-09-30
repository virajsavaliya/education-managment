'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user } = useAuth();
  
  // Basic info states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Status states
  const [submittingInfo, setSubmittingInfo] = useState(false);
  const [submittingPass, setSubmittingPass] = useState(false);
  const [infoMessage, setInfoMessage] = useState({ text: '', type: '' });
  const [passMessage, setPassMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      // Fetch phone from details API if not on token
      fetchProfileDetails();
    }
  }, [user]);

  const fetchProfileDetails = async () => {
    try {
      const res = await fetch('/api/student/profile');
      const data = await res.json();
      if (res.ok && data.user) {
        setName(data.user.name || '');
        setEmail(data.user.email || '');
        setPhone(data.user.phone || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setSubmittingInfo(true);
    setInfoMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setInfoMessage({ text: 'Basic profile details updated successfully! Please refresh or re-login to see name changes in the layout bar.', type: 'success' });
      } else {
        setInfoMessage({ text: data.error || 'Failed to update info', type: 'danger' });
      }
    } catch (err) {
      setInfoMessage({ text: 'Connection failure', type: 'danger' });
    } finally {
      setSubmittingInfo(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassMessage({ text: 'New passwords do not match!', type: 'danger' });
      return;
    }
    setSubmittingPass(true);
    setPassMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassMessage({ text: 'Password changed successfully!', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPassMessage({ text: data.error || 'Failed to change password', type: 'danger' });
      }
    } catch (err) {
      setPassMessage({ text: 'Connection failure', type: 'danger' });
    } finally {
      setSubmittingPass(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 4px' }}>Profile Settings</h2>
        <p style={{ color: 'var(--ed-paragraph-color)', margin: 0, fontSize: 14 }}>Manage your personal details and account password security.</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Basic Details */}
        <div className="col-md-6 col-12">
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 16px' }}>
              Basic Information
            </h3>

            {infoMessage.text && (
              <div className={`alert alert-${infoMessage.type}`} style={{ fontSize: 13.5, padding: '10px 14px', borderRadius: 8 }}>
                {infoMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdateInfo}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Email Address (Read-only)</label>
                <input
                  type="email" disabled value={email}
                  style={{ ...inputStyle, background: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Mobile / Phone Number</label>
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  style={inputStyle} placeholder="+91 98765 43210"
                />
              </div>

              <button
                type="submit" disabled={submittingInfo}
                style={{
                  background: 'var(--ed-primary-color)', color: '#fff', border: 'none',
                  borderRadius: 6, width: '100%', padding: '10px 0', fontWeight: 600,
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {submittingInfo ? 'Saving...' : 'Save Profile Details'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Change Password */}
        <div className="col-md-6 col-12">
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)', margin: '0 0 16px' }}>
              Change Password
            </h3>

            {passMessage.text && (
              <div className={`alert alert-${passMessage.type}`} style={{ fontSize: 13.5, padding: '10px 14px', borderRadius: 8 }}>
                {passMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdatePassword}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Current Password *</label>
                <input
                  type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                  style={inputStyle} placeholder="••••••••"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>New Password *</label>
                <input
                  type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  style={inputStyle} placeholder="At least 6 characters"
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Confirm New Password *</label>
                <input
                  type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  style={inputStyle} placeholder="Re-type new password"
                />
              </div>

              <button
                type="submit" disabled={submittingPass}
                style={{
                  background: 'var(--ed-primary-color)', color: '#fff', border: 'none',
                  borderRadius: 6, width: '100%', padding: '10px 0', fontWeight: 600,
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                {submittingPass ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const formGroupStyle = { marginBottom: 16 };
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ed-title-color)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid var(--ed-border-color)',
  borderRadius: 6, fontSize: 13.5, outline: 'none', fontFamily: 'var(--ed-font-family)',
};
