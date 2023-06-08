/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'usuario',
  initialState: {
    usuario: {
      id: '',
      usuario: '',
      role: '',
      token: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
