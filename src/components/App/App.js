import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "components/Header";
import HomePage from "components/pages/HomePage";
import LeaderboardPage from "components/pages/LeaderboardPage";
import NewPage from "components/pages/NewPage";
import PollDetails from "components/poll/PollDetails";
import { logout } from "reducers/userSlice";
import {
	HOME_PATH,
	LEADERBOARD_PATH,
	LOGIN_PATH,
	NEW_PATH,
	POLL_PATH,
} from "constants";
import LoginPage from "components/pages/LoginPage";

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		navigate(LOGIN_PATH);
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
					element={<HomePage />}
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
					path={POLL_PATH + "*"}
					element={<PollDetails />}
				/>
			</Routes>
		</div>
	);
};

export default App;
