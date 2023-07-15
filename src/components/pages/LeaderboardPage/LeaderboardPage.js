import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { fetchUsers, selectUsers } from "reducers/userSlice";
import { cssClasses } from "cssClasses";

const LeaderboardPage = () => {
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

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
						{users.map((user) => {
							return (
								<tr key={user.id}>
									<td>
										<div className={classNames([cssClasses.flex, "user-info"])}>
											<img
												className="avatar"
												src={user.avatarURL}
												alt={"Avatar of " + user.name}
											/>
											<div
												className={classNames([cssClasses.flexColumn, "user"])}>
												<p className="name">{user.name}</p>
												<p className="username">{user.id}</p>
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
