import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
   token: null,
  },
  reducers: {
    login: (state,action) => {
        state.isAuth = true;
        state.token = action.payload;
    },
    logOut: (state) => {
        state.isAuth = false;
        token = null;
    },
    
  },
})


export const {login,logOut } = authSlice.actions

export default authSlice.reducer