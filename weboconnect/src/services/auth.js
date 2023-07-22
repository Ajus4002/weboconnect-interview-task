import {setAuthToken} from './api'

const TOKEN_KEY = 'token';

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  setAuthToken(token)
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
