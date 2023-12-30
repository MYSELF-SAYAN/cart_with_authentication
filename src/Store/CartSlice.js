import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartOpen: false,
   
  },
  reducers: {
   setOpen: (state) => {
        state.cartOpen = true;
    
    },
    setClose: (state) => {
        state.cartOpen = false;
        
    },
    
  },
})


export const {setClose,setOpen } = cartSlice.actions

export default cartSlice.reducer