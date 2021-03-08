import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const initialState = {
  user: null,
  username: null,
};

const UserContext = createContext(initialState);

const useUserData = () => {
  const [username, setUsername] = useState<string | null>();
  const [user] = useAuthState(auth);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = db.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        if (doc.exists) {
          setUsername(doc.data()?.username);
        }
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const value = useUserData();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
