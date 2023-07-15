import { createSlice } from "@reduxjs/toolkit";
import { _getQuestions } from "_DATA";

const polls = await _getQuestions();

export const pollSlice = createSlice({
	name: "poll",
	initialState: {
		polls: polls || {},
	},
	reducers: {
		createPoll: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

export const { createPoll, decrement, incrementByAmount } = pollSlice.actions;
export const selectPolls = (state) => state.poll.polls;

export default pollSlice.reducer;
