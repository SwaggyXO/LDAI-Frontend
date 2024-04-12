import Cookies from 'js-cookie';
import { UserState } from './userSlice';

export const setUserCookie = (user: Partial<UserState>) => {
  const existingUser = getUserCookie();
  const updatedUser = { ...existingUser, ...user };
  Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 }); // Cookie will expire after 7 days
};

export const getUserCookie = (): UserState | null => {
  const userCookie = Cookies.get('user');

  if (!userCookie) {
    return null;
  }

  return JSON.parse(userCookie);
};

export const removeUserCookie = () => {
  Cookies.remove('user');
};