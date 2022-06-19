import { createSlice } from '@reduxjs/toolkit'

export const statusNavbar = createSlice({
    name : 'Status Navbar',
    initialState : {
        value : 'close',
    },
    reducers : {
        showNavbar : (state => {
            state.value = 'show'
        }),
        closeNavbar : (state => {
           state.value = 'close'
        }),
    },
});

export const {showNavbar, closeNavbar} = statusNavbar.actions;

export default statusNavbar.reducer