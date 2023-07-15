import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "_DATA";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await _getUsers();
	return response;
});

const users = await _getUsers();

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isAuthorized: false,
	},
	reducers: {
		login: (state, action) => {
			const user = users[action.payload.id];

			if (
				user?.id === action.payload.id &&
				user?.password === action.payload.password
			) {
				state.isAuthorized = true;
			}
		},

		logout: (state) => {
			state.isAuthorized = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = "succeeded";
				// Add any fetched posts to the array
				// state.posts = state.posts.concat(action.payload);
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { login, logout } = userSlice.actions;
export const selectIsAuthorized = (state) => state.user.isAuthorized;

export default userSlice.reducer;
