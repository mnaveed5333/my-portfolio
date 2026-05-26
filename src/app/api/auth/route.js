import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  // TEMP DEBUG — remove after fixing
  console.log('--- LOGIN DEBUG ---');
  console.log('Input email:    ', JSON.stringify(email));
  console.log('Input password: ', JSON.stringify(password));
  console.log('ENV email:      ', JSON.stringify(process.env.ADMIN_EMAIL));
  console.log('ENV password:   ', JSON.stringify(process.env.ADMIN_PASSWORD));
  console.log('Email match:    ', email === process.env.ADMIN_EMAIL);
  console.log('Pass match:     ', password === process.env.ADMIN_PASSWORD);
  console.log('-------------------');

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ 
      success: true,
      redirect: '/admin'
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