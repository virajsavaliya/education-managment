'use client';

import { useEffect, useState } from 'react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Site settings state keys map directly to DB siteSettings table keys
  const [siteName, setSiteName] = useState('Eduna LMS');
  const [contactEmail, setContactEmail] = useState('contact@eduna.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [contactAddress, setContactAddress] = useState('MG Road, Shivaji Nagar, Pune, Maharashtra');
  
  // Social links
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');

  // Google Calendar Integration Settings
  const [googleCalendarId, setGoogleCalendarId] = useState('primary');
  const [googleServiceAccountJson, setGoogleServiceAccountJson] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.settings) {
        const s = data.settings;
        if (s.siteName) setSiteName(s.siteName);
        if (s.contactEmail) setContactEmail(s.contactEmail);
        if (s.contactPhone) setContactPhone(s.contactPhone);
        if (s.contactAddress) setContactAddress(s.contactAddress);
        if (s.facebook) setFacebook(s.facebook);
        if (s.twitter) setTwitter(s.twitter);
        if (s.instagram) setInstagram(s.instagram);
        if (s.youtube) setYoutube(s.youtube);
        if (s.googleCalendarId) setGoogleCalendarId(s.googleCalendarId);
        if (s.googleServiceAccountJson) setGoogleServiceAccountJson(s.googleServiceAccountJson);
      }
    } catch (err) {
      setError('Could not load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    const payload = {
      settings: {
        siteName,
        contactEmail,
        contactPhone,
        contactAddress,
        facebook,
        twitter,
        instagram,
        youtube,
        googleCalendarId,
        googleServiceAccountJson,
      }
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save settings');
      }
    } catch (err) {
      setError('Network connection error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)', padding: 60, textAlign: 'center' }}>
        <div className="spinner-border" style={{ color: 'var(--ed-primary-color)', width: 28, height: 28 }} role="status" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <form onSubmit={handleSave}>
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14, fontWeight: 600 }}>
            ✓ Platform settings updated successfully!
          </div>
        )}

        {/* Section 1: General Info */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>General Platform Config</h3>
          <div className="row">
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Site / Platform Name</label>
              <input
                type="text" value={siteName} onChange={e => setSiteName(e.target.value)}
                style={inputStyle} placeholder="Eduna"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Support / Contact Email</label>
              <input
                type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                style={inputStyle} placeholder="support@domain.com"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Contact Phone Number</label>
              <input
                type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                style={inputStyle} placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Contact Address</label>
              <input
                type="text" value={contactAddress} onChange={e => setContactAddress(e.target.value)}
                style={inputStyle} placeholder="123 Education Rd"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Links */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Social Integration Profiles</h3>
          <div className="row">
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Facebook Link</label>
              <input
                type="url" value={facebook} onChange={e => setFacebook(e.target.value)}
                style={inputStyle} placeholder="https://facebook.com/eduna"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Twitter / X Link</label>
              <input
                type="url" value={twitter} onChange={e => setTwitter(e.target.value)}
                style={inputStyle} placeholder="https://twitter.com/eduna"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>Instagram Link</label>
              <input
                type="url" value={instagram} onChange={e => setInstagram(e.target.value)}
                style={inputStyle} placeholder="https://instagram.com/eduna"
              />
            </div>
            <div className="col-md-6 col-12" style={formGroupStyle}>
              <label style={labelStyle}>YouTube Channel</label>
              <input
                type="url" value={youtube} onChange={e => setYoutube(e.target.value)}
                style={inputStyle} placeholder="https://youtube.com/c/eduna"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Google Calendar & Meet Integration */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Google Calendar & Meet Integration</h3>
          <p style={{ fontSize: 13, color: 'var(--ed-paragraph-color)', marginTop: -10, marginBottom: 16 }}>
            Enable auto-scheduling of Google Meets and calendar updates for enrolled students. 
            Paste your Google Cloud Service Account JWT Credentials JSON below.
          </p>
          <div className="row">
            <div className="col-12" style={formGroupStyle}>
              <label style={labelStyle}>Google Calendar ID</label>
              <input
                type="text" value={googleCalendarId} onChange={e => setGoogleCalendarId(e.target.value)}
                style={inputStyle} placeholder="primary or specific-calendar@group.calendar.google.com"
              />
            </div>
            <div className="col-12" style={formGroupStyle}>
              <label style={labelStyle}>Google Service Account JSON Key</label>
              <textarea
                value={googleServiceAccountJson} onChange={e => setGoogleServiceAccountJson(e.target.value)}
                style={{ ...inputStyle, height: 120, fontFamily: 'monospace', fontSize: 12 }}
                placeholder='{ "type": "service_account", "project_id": "...", "private_key": "...", "client_email": "..." }'
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="submit" disabled={saving}
            style={{
              background: 'var(--ed-primary-color)', color: '#fff',
              border: 'none', borderRadius: 6, padding: '12px 24px',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
          >
            {saving ? 'Saving changes...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

const sectionStyle = {
  background: '#fff', borderRadius: 10, border: '1px solid var(--ed-border-color)',
  padding: 24, marginBottom: 24,
};
const sectionTitleStyle = {
  fontSize: 15, fontWeight: 700, color: 'var(--ed-title-color)',
  borderBottom: '1px solid var(--ed-border-color)', paddingBottom: 10, marginBottom: 16,
};
const formGroupStyle = { marginBottom: 14 };
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ed-title-color)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '8px 12px', border: '1px solid var(--ed-border-color)',
  borderRadius: 6, fontSize: 13.5, outline: 'none', fontFamily: 'var(--ed-font-family)',
};
