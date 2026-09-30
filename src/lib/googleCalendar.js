import { google } from 'googleapis';

/**
 * Creates a Google Calendar Event with an auto-generated Google Meet video conference link,
 * and invites students as attendees (sending automated email invitations).
 * 
 * @param {string} calendarId Target calendar ID (e.g. 'primary' or specific calendar email)
 * @param {string} serviceAccountJsonStr Raw JSON string of Google Cloud Service Account Credentials
 * @param {object} eventDetails Event details (title, description, startDateTime, durationMinutes, attendeeEmails)
 * @returns {Promise<{ eventId: string, meetLink: string }>} Created event details
 */
export async function createGoogleMeetEvent(calendarId, serviceAccountJsonStr, { title, description, startDateTime, durationMinutes, attendeeEmails }) {
  if (!serviceAccountJsonStr) {
    throw new Error('Service Account JSON is not configured.');
  }

  const credentials = JSON.parse(serviceAccountJsonStr);
  const privateKey = (credentials.private_key || '').replace(/\\n/g, '\n');
  
  // Set up JWT Auth Client for Google Calendar scopes
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events']
  );

  // Authenticate the client
  await auth.authorize();

  const calendar = google.calendar({ version: 'v3', auth });

  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const eventPayload = {
    summary: title,
    description: description || '',
    start: {
      dateTime: start.toISOString(),
      timeZone: 'Asia/Kolkata', // Localize time zone default for India
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    // Invite enrolled students
    attendees: (attendeeEmails || []).map(email => ({ email })),
    // Request Google Meet generation
    conferenceData: {
      createRequest: {
        requestId: `eduna-meet-${Date.now()}-${Math.random().toString(36).substring(3, 8)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: calendarId || 'primary',
    requestBody: eventPayload,
    conferenceDataVersion: 1,
    sendUpdates: 'all', // Send invites & email notifications immediately to students
  });

  const eventData = response.data;
  
  // Google Meet video call url is stored in hangoutLink
  const meetLink = eventData.hangoutLink || '';

  return {
    eventId: eventData.id,
    meetLink,
  };
}
