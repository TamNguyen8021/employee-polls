import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { fetchUsers, selectUsers } from "reducers/userSlice";
import { LEADERBOARD_PATH, LOGIN_PATH } from "constants";
import { cssClasses } from "cssClasses";

const LeaderboardPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);

	useEffect(() => {
		if (!location.state?.id) {
			navigate(LOGIN_PATH, { state: { from: LEADERBOARD_PATH } });
		}

		dispatch(fetchUsers());
	}, []);

	const sortUsersByAnsweredAndCreatedQuestions = () => {
		const tempUsers = [...users];

		return tempUsers.sort(
			(firstUser, secondUser) =>
				Object.keys(secondUser.answers).length -
				Object.keys(firstUser.answers).length +
				(secondUser.questions.length - firstUser.questions.length),
		);
	};

	return (
		<div className="leaderboard-page">
			{users.length ? (
				<table className="leaderboard-table">
					<thead>
						<tr>
							<th>Users</th>
							<th>Answered</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						{sortUsersByAnsweredAndCreatedQuestions().map((user) => {
							return (
								<tr key={user?.id}>
									<td>
										<div className={classNames([cssClasses.flex, "user-info"])}>
											<img
												className="avatar"
												src={user?.avatarURL}
												alt={"Avatar of " + user.name}
											/>
											<div
												className={classNames([cssClasses.flexColumn, "user"])}>
												<p className="name">{user.name}</p>
												<p className="username">{user?.id}</p>
											</div>
										</div>
									</td>
									<td className="answer">{Object.keys(user.answers).length}</td>
									<td className="created">{user.questions.length}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : null}
		</div>
	);
};

export default LeaderboardPage;
