import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from '../utils/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session && <Link href="/login">Login</Link>}
      {session && <Link href="/logout">Logout</Link>}
      <br></br>
      {session && <Link href="/user">User info</Link>}
    </>
  );
}
