import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ 
      success: true,
      redirect: '/admin'    // ← backend tells frontend where to go
    });
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      secure: false,
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}