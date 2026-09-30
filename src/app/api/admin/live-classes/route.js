import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { createGoogleMeetEvent } from '@/lib/googleCalendar';

async function requireAdmin(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
  return token?.role === 'ADMIN';
}

export async function GET(request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const liveClasses = await prisma.liveClass.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: { courses: { select: { id: true, title: true } } },
    });
    return NextResponse.json({ liveClasses });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await request.json();
    const { title, description, courseIds, scheduledAt, duration, meetLink, isActive } = body;

    if (!title || !scheduledAt || !duration) {
      return NextResponse.json({ error: 'Title, scheduledAt and duration are required' }, { status: 400 });
    }

    // Check for Google Calendar Integration configuration
    const settingsList = await prisma.siteSetting.findMany({
      where: {
        key: { in: ['googleCalendarId', 'googleServiceAccountJson'] }
      }
    });

    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    let finalMeetLink = meetLink || null;

    if (settings.googleServiceAccountJson && settings.googleServiceAccountJson.trim()) {
      try {
        // Fetch enrolled students emails
        let attendeeEmails = [];
        if (courseIds && courseIds.length > 0) {
          const enrollments = await prisma.enrollment.findMany({
            where: { courseId: { in: courseIds } },
            include: {
              user: {
                select: { email: true }
              }
            }
          });
          attendeeEmails = Array.from(new Set(enrollments.map(e => e.user.email)));
        }

        const calendarResult = await createGoogleMeetEvent(
          settings.googleCalendarId || 'primary',
          settings.googleServiceAccountJson,
          {
            title,
            description,
            startDateTime: scheduledAt,
            durationMinutes: parseInt(duration),
            attendeeEmails,
          }
        );

        if (calendarResult.meetLink) {
          finalMeetLink = calendarResult.meetLink;
        }
      } catch (calendarError) {
        console.error('Google Calendar API sync failed. Falling back to database creation:', calendarError);
      }
    }

    const liveClass = await prisma.liveClass.create({
      data: {
        title,
        description: description || null,
        courses: {
          connect: courseIds && courseIds.length > 0 ? courseIds.map(id => ({ id })) : []
        },
        scheduledAt: new Date(scheduledAt),
        duration: parseInt(duration),
        meetLink: finalMeetLink,
        isActive: isActive !== false,
      },
    });
    
    return NextResponse.json({ liveClass }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
