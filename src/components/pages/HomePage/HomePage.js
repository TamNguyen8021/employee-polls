import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { fetchPolls, selectPolls } from "reducers/pollSlice";
import { selectIsAuthorized } from "reducers/userSlice";
import PollSection from "components/poll/PollSection";
import { LOGIN_PATH } from "constants";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the home page
 */
const HomePage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isAuthorized = useSelector(selectIsAuthorized);
	const dispatch = useDispatch();
	const polls = useSelector(selectPolls);
	const [isShowUnansweredPolls, setIsShowUnansweredPolls] = useState(true);

	useEffect(() => {
		if (!isAuthorized) {
			navigate(LOGIN_PATH, { state: { from: location.pathname } });
		}

		dispatch(fetchPolls());
	}, []);

	const toggleChange = () => {
		setIsShowUnansweredPolls(!isShowUnansweredPolls);
	}

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
			<div className={classNames([cssClasses.flex])}>
				<input
					type="radio"
					value={true}
					checked={isShowUnansweredPolls}
					onChange={toggleChange}
				/>
				<input
					type="radio"
					value={false}
					onChange={toggleChange}
				/>
			</div>
			{isShowUnansweredPolls ? <PollSection
				title="New Questions"
				polls={filterUnansweredQuestions()}
			/> : null}
			{!isShowUnansweredPolls ? <PollSection
				title="Done"
				polls={filterAnsweredQuestions()}
			/> : null}
		</div>
	);
};

export default HomePage;
