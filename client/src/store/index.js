import { configureStore } from "@reduxjs/toolkit"
import example from "./example";

const store = configureStore({
    reducer:{ example, }
})

export default store;