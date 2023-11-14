import { configureStore } from "@reduxjs/toolkit"
import move from './move';

const store = configureStore({
    reducer:{ move }
})

export default store;