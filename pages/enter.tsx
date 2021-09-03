import Image from 'next/image';
import Metatags from '@/components/Metatags';
import SignOutButton from '@/components/SignOut';
import UsernameForm from '@/components/UsernameForm';
import { auth, githubOAuthProvider, googleOAuthProvider } from '@/lib/firebase';
import { useUser } from '@/providers/UserProvider';
import githubImg from '../public/github.png';
import googleImg from '../public/google.png';

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleOAuthProvider);
  };
  const signInWithGithub = async () => {
    await auth.signInWithPopup(githubOAuthProvider);
  };

  return (
    <>
      <button className="btn-auth" onClick={signInWithGoogle}>
        <Image src={googleImg} alt="Google Sign In" height={30} width={30} />{' '}
        Sign in with Google
      </button>
      <button className="btn-auth" onClick={signInWithGithub}>
        <Image src={githubImg} alt="GitHub Sign In" height={30} width={30} />{' '}
        Sign in with GitHub
      </button>
    </>
  );
};

const EnterPage = () => {
  const { user, username } = useUser();

  return (
    <>
      <Metatags title="Enter" description="Sign up for code.to!" />

      <main>
        {user ? (
          username ? (
            <SignOutButton />
          ) : (
            <UsernameForm />
          )
        ) : (
          <SignInButton />
        )}
      </main>
    </>
  );
};

export default EnterPage;
