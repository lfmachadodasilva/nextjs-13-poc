'use client';

import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';
import { AuthProviders } from '../../utils/authProviders';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginGoogle = async () => {
    setLoading(true);
    try {
      await signIn(AuthProviders.Google);
    } catch (error) {
      alert('Error signing in');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoginCredentials = async () => {
    setLoading(true);
    try {
      await signIn(AuthProviders.Credentials, {
        username: userNameRef.current?.value,
        password: passwordRef.current?.value
      });
    } catch (error) {
      alert('Error signing in');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input ref={userNameRef} type="text" />
      <br></br>
      <input ref={passwordRef} type="password" />
      <br></br>
      <button type="button" key="credentials" disabled={loading} onClick={handleLoginCredentials}>
        {loading && 'Loading'}
        {!loading && 'Login'}
      </button>

      {/* <button key="google" disabled={loading} onClick={handleLoginGoogle}>
        {loading && 'Loading'}
        {!loading && 'Login google'}
      </button> */}
      {/* <br></br> */}
    </>
  );
}
