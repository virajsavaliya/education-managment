import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findFirst({
      where: { 
        code: {
          equals: code.toUpperCase().trim(),
          mode: 'insensitive'
        }, 
        isActive: true 
      }
    });

    if (!coupon) {
      return NextResponse.json({ valid: false, error: 'Invalid coupon code.' });
    }

    // Check expiration date
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ valid: false, error: 'Coupon has expired.' });
    }

    return NextResponse.json({ valid: true, discount: coupon.discount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
