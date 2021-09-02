import Link from 'next/link';
import { useUser } from '@/providers/UserProvider';
import SignOutButton from './SignOut';

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
              <SignOutButton />
            </li>
            <li>
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL} alt="" />
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
