import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from '../../utils/auth';

const UserPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Link href="/">Home</Link>
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

        {session?.user?.image && (
          <img src={session?.user?.image as string} alt="user image" height={100} />
        )}
      </form>
    </>
  );
};
export default UserPage;
