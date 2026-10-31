import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import themeReducer from './themeSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const { auth, theme } = store.getState();

  if (auth.token) {
    localStorage.setItem('token', auth.token);
  } else {
    localStorage.removeItem('token');
  }

  if (auth.user) {
    localStorage.setItem('user', JSON.stringify(auth.user));
  } else {
    localStorage.removeItem('user');
  }

  localStorage.setItem('darkMode', theme.darkMode);
});
