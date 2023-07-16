import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "_DATA";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
	const response = await _getUsers();
	return response;
});

const users = await _getUsers();

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isAuthorized: false,
		users: [],
		isUserDataLoading: true,
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
				state.isUserDataLoading = true;
				state.users = [];
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.isUserDataLoading = false;
				for (const [key, value] of Object.entries(action.payload)) {
					const valueIndex = state.users.findIndex((user) => user.id === key);
					if (valueIndex === -1) {
						state.users.push(value);
					} else {
						state.users[valueIndex] = value;
					}
				}
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isUserDataLoading = false;
				state.users = [];
			});
	},
});

export const { login, logout } = userSlice.actions;
export const selectIsUserDataLoading = (state) => state.user.isUserDataLoading;
export const selectIsAuthorized = (state) => state.user.isAuthorized;
export const selectUsers = (state) => state.user.users;
export const selectUserById = (state, userId) =>
	state.user.users.find((user) => user.id === userId);

export default userSlice.reducer;
