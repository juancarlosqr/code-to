import Metatags from '@/components/Metatags';
import SignOutButton from '@/components/SignOut';
import UsernameForm from '@/components/UsernameForm';
import { auth, googleOAuthProvider } from '@/lib/firebase';
import { useUser } from '@/providers/UserProvider';

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleOAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google.png" alt="Google Sign In" /> Sign in with Google
    </button>
  );
};

const EnterPage = () => {
  const { user, username } = useUser();

  return (
    <>
      <Metatags title="Enter" description="Sign up for this amazing app!" />

      <main>
        <h1>Log In</h1>

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
