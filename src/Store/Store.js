import { configureStore } from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import cartSlice from './CartSlice'
export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
})
