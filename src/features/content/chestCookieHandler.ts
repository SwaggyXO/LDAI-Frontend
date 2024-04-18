import Cookies from 'js-cookie';

export const setChestCookie = (reward: string) => {
    Cookies.set('chest', reward, { expires: 1 }); // Cookie will expire after 1 hour
};
  
export const getChestCookie = (): string | null => {
    const chestCookie = Cookies.get('chest');

    if (!chestCookie) {
        return null;
    }

    return chestCookie;
};

export const removeChestCookie = () => {
    Cookies.remove('chest');
};