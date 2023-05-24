import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        userId: parseInt(sessionStorage.getItem("userId")),
        token: sessionStorage.getItem("token"),
        range: parseInt(sessionStorage.getItem("range")),
    },
    reducers: {
        setUsers: (state, action) => {
            state.userId = action.payload.userId;
            state.range = action.payload.range;
            state.token = action.payload.token;
        },
    },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
