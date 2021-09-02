import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/providers/UserProvider';
import SignOutButton from './SignOut';
import hackerImg from '../public/hacker.png';

const Navbar = () => {
  const { user, username } = useUser();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">CODE</button>
          </Link>
        </li>

        {username ? (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <Image
                  src={user?.photoURL || hackerImg}
                  alt="Picture of the user"
                  height={50}
                  width={50}
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/enter" passHref>
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
