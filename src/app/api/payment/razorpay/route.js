import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const body = await request.json();
    const { courseIds, couponCode } = body;

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return NextResponse.json({ error: 'No courses selected.' }, { status: 400 });
    }

    // Fetch courses to calculate total price
    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { price: true }
    });

    let totalPrice = courses.reduce((sum, c) => sum + c.price, 0);

    // Apply coupon if valid
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true }
      });
      if (coupon && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date())) {
        const discountAmount = totalPrice * (coupon.discount / 100);
        totalPrice = Math.max(0, totalPrice - discountAmount);
      }
    }

    const amountPaise = Math.round(totalPrice * 100);

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Check if Razorpay is configured
    if (!key_id || !key_secret) {
      console.warn('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Running in SANDBOX SIMULATION mode.');
      return NextResponse.json({
        orderId: `order_mock_${Math.random().toString(36).substring(3, 10)}`,
        amount: amountPaise,
        currency: 'INR',
        isMock: true,
        keyId: 'mock_key_sandbox'
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      isMock: false,
      keyId: key_id
    });

  } catch (e) {
    console.error('Razorpay order creation failed:', e);
    return NextResponse.json({ error: 'Failed to create payment order.' }, { status: 500 });
  }
}
