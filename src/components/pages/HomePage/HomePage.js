import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPolls, selectPolls } from "reducers/pollSlice";
import PollSection from "components/poll/PollSection";
import { LOGIN_PATH } from "constants";

/**
 * @description Represents the home page
 */
const HomePage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const polls = useSelector(selectPolls);

	useEffect(() => {
		if (!location.state?.id) {
			navigate(LOGIN_PATH, { state: { from: location.pathname } });
		}

		dispatch(fetchPolls());
	}, []);

	const filterAnsweredQuestions = () => {
		const answeredQuestions = [];

		for (const value of Object.values(polls)) {
			if (
				value.optionOne.votes.includes(location.state?.id) ||
				value.optionTwo.votes.includes(location.state?.id)
			) {
				answeredQuestions.push(value);
			}
		}

		return answeredQuestions;
	};

	const filterUnansweredQuestions = () => {
		const unanweredQuestions = [];
		const answeredQuestions = filterAnsweredQuestions();

		for (const [key, value] of Object.entries(polls)) {
			if (!answeredQuestions.find((question) => question.id === key)) {
				unanweredQuestions.push(value);
			}
		}
		return unanweredQuestions;
	};

	return (
		<div
			data-test-id="home-page"
			className="home-page">
			<PollSection
				title="New Questions"
				polls={filterUnansweredQuestions()}
			/>
			<PollSection
				title="Done"
				polls={filterAnsweredQuestions()}
			/>
		</div>
	);
};

export default HomePage;
