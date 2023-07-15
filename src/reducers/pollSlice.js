import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getQuestions } from "_DATA";

export const fetchPolls = createAsyncThunk("poll/fetchPolls", async () => {
	const response = await _getQuestions();
	return response;
});

export const pollSlice = createSlice({
	name: "poll",
	initialState: {
		polls: {},
	},
	reducers: {
		createPoll: (state, action) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPolls.pending, (state, action) => {
				state.polls = {};
			})
			.addCase(fetchPolls.fulfilled, (state, action) => {
				for (const [key, value] of Object.entries(action.payload)) {
					state.polls[key] = value;
				}
			})
			.addCase(fetchPolls.rejected, (state, action) => {
				state.polls = {};
			});
	},
});

export const { createPoll, decrement, incrementByAmount } = pollSlice.actions;
export const selectPolls = (state) => state.poll.polls;

export default pollSlice.reducer;
