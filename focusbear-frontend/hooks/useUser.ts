import { AuthContext } from '@/store/AuthContext';
import { useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  // Add user function, including local storage and state update
  const addUser = (newUser: BaseUser) => {
    if (!newUser) {
      return;
    }

    // Update state and local storage only if the user is new or different
    if (JSON.stringify(user) !== JSON.stringify(newUser)) {
      setUser(newUser);
      setItem('user', JSON.stringify(newUser));
    } else {
    }
  };

  // Remove user function, clears local storage and state
  const removeUser = () => {
    removeItem('user');
    setUser(null); // Assuming `null` is used for when there is no user logged in
  };

  return { user, addUser, removeUser, setUser };
};
