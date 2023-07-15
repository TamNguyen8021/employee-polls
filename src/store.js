import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "reducers/pollSlice";
import userReducer from "reducers/userSlice";

export default configureStore({
	reducer: {
		poll: pollReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
