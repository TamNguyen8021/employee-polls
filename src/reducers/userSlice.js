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
				state.users = [];
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
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
				state.users = [];
			});
	},
});

export const { login, logout } = userSlice.actions;
export const selectIsAuthorized = (state) => state.user.isAuthorized;
export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
