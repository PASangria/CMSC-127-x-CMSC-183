import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('access_token');
export const setToken = (token) => Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });
export const removeToken = () => Cookies.remove('access_token');

export const getRefreshToken = () => Cookies.get('refresh_token');
export const setRefreshToken = (token) => Cookies.set('refresh_token', token, { secure: true, sameSite: 'Strict' });
export const removeRefreshToken = () => Cookies.remove('refresh_token');

export const getRole = () => Cookies.get('role');
export const setRole = (role) => Cookies.set('role', role, { secure: true, sameSite: 'Strict' });
export const removeRole = () => Cookies.remove('role');
