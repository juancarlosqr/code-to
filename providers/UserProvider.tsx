import { createContext, ReactNode, useContext } from 'react';

const initialState = {
  user: null,
  username: null,
};

const UserContext = createContext(initialState);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={initialState}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
