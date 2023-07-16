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
		isPollDataLoading: true,
		hasErrors: false,
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPolls.pending, (state, action) => {
				state.isPollDataLoading = true;
				state.hasErrors = false;
				state.polls = {};
			})
			.addCase(fetchPolls.fulfilled, (state, action) => {
				state.isPollDataLoading = false;
				state.hasErrors = false;
				for (const [key, value] of Object.entries(action.payload)) {
					state.polls[key] = value;
				}
			})
			.addCase(fetchPolls.rejected, (state, action) => {
				state.isPollDataLoading = false;
				state.hasErrors = true;
				state.polls = {};
			})
			.addCase(createPoll.pending, (state, action) => {
				state.isPollDataLoading = true;
				state.hasErrors = false;
			})
			.addCase(createPoll.fulfilled, (state, action) => {
				state.isPollDataLoading = false;
				state.hasErrors = false;
			})
			.addCase(createPoll.rejected, (state, action) => {
				state.isPollDataLoading = false;
				state.hasErrors = true;
			});
	},
});

// export const { } = pollSlice.actions;
export const selectIsPollDataLoading = (state) => state.poll.isPollDataLoading;
export const selectPolls = (state) => state.poll.polls;
export const selectPollById = (state, pollId) => {
	for (const [key, value] of Object.entries(state.poll.polls)) {
		if (key === pollId) {
			return value;
		}
	}
};
export const selectHasErrors = (state) => state.poll.hasErrors;

export default pollSlice.reducer;
