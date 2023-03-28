import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default async function login({ email, password }) {
  try {
    const router = useRouter();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/account/login',
    });
    router.back();
  } catch (err) {
    console.log(`CAN NOT LOGIN`, err);
  }
}
