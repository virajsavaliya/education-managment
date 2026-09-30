import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = token.sub || token.id; // NextAuth user subject ID
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseIds, isMock } = body;

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return NextResponse.json({ error: 'Missing course registrations details.' }, { status: 400 });
    }

    if (isMock) {
      console.log('Skipping Razorpay signature verification for sandbox test order.');
    } else {
      const key_secret = process.env.RAZORPAY_KEY_SECRET;
      if (!key_secret) {
        return NextResponse.json({ error: 'Payment gateway configuration issue.' }, { status: 500 });
      }

      // Compute verification hash signature
      const expectedSignature = crypto
        .createHmac('sha256', key_secret)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ error: 'Payment signature verification failed.' }, { status: 400 });
      }
    }

    // Create database enrollments for user
    const enrollmentTransactions = courseIds.map(courseId => {
      return prisma.enrollment.upsert({
        where: {
          userId_courseId: { userId, courseId }
        },
        update: {},
        create: { userId, courseId }
      });
    });

    await prisma.$transaction(enrollmentTransactions);

    return NextResponse.json({ success: true });

  } catch (e) {
    console.error('Payment verification failed:', e);
    return NextResponse.json({ error: 'Transaction validation failed.' }, { status: 500 });
  }
}
