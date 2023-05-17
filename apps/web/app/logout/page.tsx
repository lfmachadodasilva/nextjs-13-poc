'use client';

import { signOut } from 'next-auth/react';

const LogoutPage = () => {
  signOut().then(() => {
    // redirect(Routes.login);
  });
  return <>Logout</>;
};
export default LogoutPage;
