import { configureStore } from "@reduxjs/toolkit";
//reducer
import user from "./slices/User";

export default configureStore({
    reducer: {
        user,
    },
});
