'use client';

import { Routes } from '@/utils/routes';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function LogoutPage() {
  signOut().then(() => {
    // redirect(Routes.login);
  });
  return <>Logout</>;
}
