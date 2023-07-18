import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "_DATA";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
	const response = await _getUsers();
	return response;
});

export const login = createAsyncThunk(
	"user/login",
	async ({ id, password }) => {
		const response = await _getUsers();

		for (const value of Object.values(response)) {
			if (value?.id === id && value?.password === password) {
				return true;
			}
		}
		return false;
	},
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isAuthorized: false,
		users: [],
		isUserDataLoading: false,
	},
	reducers: {
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
			})
			.addCase(login.pending, (state, action) => {
				state.isUserDataLoading = true;
				state.isAuthorized = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isUserDataLoading = false;

				if (action.payload) {
					state.isAuthorized = true;
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isUserDataLoading = false;
				state.isAuthorized = false;
			});
	},
});

export const { logout } = userSlice.actions;
export const selectIsUserDataLoading = (state) => state.user.isUserDataLoading;
export const selectIsAuthorized = (state) => state.user.isAuthorized;
export const selectUsers = (state) => state.user.users;
export const selectUserById = (state, userId) =>
	state.user.users.find((user) => user.id === userId);

export default userSlice.reducer;
