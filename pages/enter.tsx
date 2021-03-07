import { auth, googleOAuthProvider } from '@/lib/firebase';
import { useUser } from '@/providers/UserProvider';

const UsernameForm = () => {
  return <section>Username</section>;
};

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

const SignOutButton = () => {
  return (
    <button className="btn" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
};

const EnterPage = () => {
  const { user, username } = useUser();

  return (
    <main>
      <h1>Enter</h1>

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
  );
};

export default EnterPage;
