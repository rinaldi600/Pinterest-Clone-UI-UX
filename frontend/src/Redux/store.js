import {configureStore} from "@reduxjs/toolkit";
import statusNavbar from './Features/statusNavbar';

const store = configureStore({
   reducer: {
      status : statusNavbar,
   }
});

export default store
