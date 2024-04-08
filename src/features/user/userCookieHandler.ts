import Cookies from 'js-cookie';
import { UserState } from './userSlice';

export const setUserCookie = (user: Partial<UserState>) => {
  Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Cookie will expire after 7 days
};

export const getUserCookie = (): Partial<UserState> | null => {
  const userCookie = Cookies.get('user');

  if (!userCookie) {
    return null;
  }

  return JSON.parse(userCookie);
};

export const removeUserCookie = () => {
  Cookies.remove('user');
};