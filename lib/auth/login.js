import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default async function login({ email, password }) {
  try {
    const router = useRouter();

    // simple validation logics here

    /// calling next js sign-in function
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      // callbackUrl: '/account/login',
    });
    // router.back();
  } catch (err) {
    console.log(`CAN NOT LOGIN`, err);
  }
}
