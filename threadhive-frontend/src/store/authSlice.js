import { createSlice } from '@reduxjs/toolkit';

const readStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const initialState = {
  token: (() => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null' ? token : null;
  })(),
  user: readStoredUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      if (action.payload?.token) state.token = action.payload.token;
      if (action.payload?.user) state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
