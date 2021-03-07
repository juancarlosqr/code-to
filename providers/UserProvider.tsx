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

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>();
  const [user] = useAuthState(auth);
  const value = { user, username };

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = db.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
};

export default UserProvider;
