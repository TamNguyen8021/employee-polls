import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "components/Header";
import HomePage from "components/pages/HomePage";
import LeaderboardPage from "components/pages/LeaderboardPage";
import NewPage from "components/pages/NewPage";
import PollDetails from "components/poll/PollDetails";
import PollSection from "components/poll/PollSection";
import { logout } from "reducers/userSlice";
import {
	HOME_PATH,
	LEADERBOARD_PATH,
	LOGIN_PATH,
	NEW_PATH,
	POLL_PATH,
} from "constants";
import LoginPage from "components/pages/LoginPage";
import { fetchPolls, selectPolls } from "reducers/pollSlice";
import { useEffect } from "react";

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const polls = useSelector(selectPolls);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPolls());
	}, []);

	const handleLogout = () => {
		dispatch(logout());
		navigate(LOGIN_PATH);
	};

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
		<div className="App">
			{location.state?.id ? <Header onClick={handleLogout} /> : null}
			<Routes>
				<Route
					exact
					path={LOGIN_PATH}
					element={<LoginPage />}
				/>
				<Route
					path={HOME_PATH}
					element={
						<HomePage>
							<PollSection
								title="New Questions"
								polls={filterUnansweredQuestions()}
							/>
							<PollSection
								title="Done"
								polls={filterAnsweredQuestions()}
							/>
						</HomePage>
					}
				/>
				<Route
					path={NEW_PATH}
					element={<NewPage />}
				/>
				<Route
					path={LEADERBOARD_PATH}
					element={<LeaderboardPage />}
				/>
				<Route
					path={POLL_PATH}
					element={
						<PollDetails
							username={"avc"}
							avatar={
								"https://toquoc.mediacdn.vn/280518851207290880/2022/12/15/p0dnxrcv-16710704848821827978943.jpg"
							}
						/>
					}
				/>
			</Routes>
			{/* <PollDetails
				username={"avc"}
				avatar={
					"https://toquoc.mediacdn.vn/280518851207290880/2022/12/15/p0dnxrcv-16710704848821827978943.jpg"
				}
			/> */}
		</div>
	);
};

export default App;
