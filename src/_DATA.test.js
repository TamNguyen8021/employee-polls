const { _saveQuestion, _saveQuestionAnswer } = require("_DATA");

describe("_saveQuestion method", () => {
	it("should save question without error when there's enough data", async () => {
		const response = await _saveQuestion({
			optionOneText: "1",
			optionTwoText: "2",
			author: "sarahedo",
		});

		expect(response).toMatchObject({
			...response,
			author: "sarahedo",
			optionOne: {
				...response.optionOne,
				text: "1",
			},
			optionTwo: {
				...response.optionTwo,
				text: "2",
			},
		});
	});

	it("should return an error when there's not enough data", async () => {
		let responseError = "";

		try {
			await _saveQuestion({
				optionOneText: "",
				optionTwoText: "2",
				author: "sarahedo",
			});
		} catch (error) {
			responseError = error;
		} finally {
			expect(responseError).toEqual(
				"Please provide optionOneText, optionTwoText, and author",
			);
		}
	});
});

describe("_saveQuestionAnswer method", () => {
	it("should save answer of question without error when there's enough data", async () => {
		const response = await _saveQuestionAnswer({
			authedUser: "sarahedo",
			qid: "8xf0y6ziyjabvozdd253nd",
			answer: "optionOne",
		});

		expect(response).toBeTruthy();
	});

	it("should return an error when there's not enough data", async () => {
		let responseError = "";

		try {
			await _saveQuestionAnswer({
				authedUser: "sarahedo",
				qid: "8xf0y6ziyjabvozdd253nd",
				answer: null,
			});
		} catch (error) {
			responseError = error;
		} finally {
			expect(responseError).toEqual(
				"Please provide authedUser, qid, and answer",
			);
		}
	});
});
