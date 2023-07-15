import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion } from "_DATA";

export const fetchPolls = createAsyncThunk("poll/fetchPolls", async () => {
	const response = await _getQuestions();
	return response;
});

export const createPoll = createAsyncThunk(
	"poll/createPoll",
	async (question) => {
		const response = await _saveQuestion(question);
		return response;
	},
);

export const pollSlice = createSlice({
	name: "poll",
	initialState: {
		polls: {},
		hasErrors: false,
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPolls.pending, (state, action) => {
				state.hasErrors = false;
				state.polls = {};
			})
			.addCase(fetchPolls.fulfilled, (state, action) => {
				state.hasErrors = false;
				for (const [key, value] of Object.entries(action.payload)) {
					state.polls[key] = value;
				}
			})
			.addCase(fetchPolls.rejected, (state, action) => {
				state.hasErrors = true;
				state.polls = {};
			})
			.addCase(createPoll.pending, (state, action) => {
				state.hasErrors = false;
			})
			.addCase(createPoll.fulfilled, (state, action) => {
				state.hasErrors = false;
			})
			.addCase(createPoll.rejected, (state, action) => {
				state.hasErrors = true;
			});
	},
});

// export const { } = pollSlice.actions;
export const selectPolls = (state) => state.poll.polls;
export const selectHasErrors = (state) => state.poll.hasErrors;

export default pollSlice.reducer;
