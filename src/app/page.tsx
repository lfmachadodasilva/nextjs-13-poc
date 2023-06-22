import { redirect } from 'next/navigation';

import { authOptions } from '@/utils/auth';
import { Routes } from '@/utils/routes';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect(Routes.login);
  }
  return (
    <>
      <Link href="/">Home</Link>
      <br></br>
      <Link href={Routes.logout}>Logout</Link>

      <br></br>
      <br></br>
      <form>
        <label>Id</label>
        {/* @ts-ignore */}
        <input defaultValue={session?.user?.id as string} disabled />

        <br></br>

        <label>Name</label>
        <input defaultValue={session?.user?.name as string} disabled />

        <br></br>

        <label>Email</label>
        <input defaultValue={session?.user?.email as string} disabled />

        <br></br>

        <label>All</label>
        {/* @ts-ignore */}
        <input defaultValue={session?.firebaseToken as string} disabled />

        <br></br>

        {session?.user?.image && (
          <img src={session?.user?.image as string} alt="user image" height={100} />
        )}
      </form>
    </>
  );
}
