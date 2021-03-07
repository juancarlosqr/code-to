import { auth } from '@/lib/firebase';

const SignOutButton = () => {
  return (
    <button className="btn" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
