import classNames from "classnames";
import { cssClasses } from "cssClasses";

const LeaderboardPage = () => {
	const data = [
		{ id: 1, name: "A", username: "a", answer: 2, created: 0 },
		{ id: 2, name: "B", username: "a", answer: 2, created: 0 },
		{ id: 3, name: "C", username: "a", answer: 2, created: 0 },
		{ id: 4, name: "D", username: "a", answer: 2, created: 0 },
	];
	return (
		<div className="leaderboard-page">
			{data?.length ? (
				<table className="leaderboard-table">
					<thead>
						<tr>
							<th>Users</th>
							<th>Answered</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						{data.map((user) => {
							return (
								<tr key={user.id}>
									<td>
										<div className={classNames([cssClasses.flex, "user-info"])}>
											<img
												className="avatar"
												src="https://toquoc.mediacdn.vn/280518851207290880/2022/12/15/p0dnxrcv-16710704848821827978943.jpg"
												alt={"Avatar of " + user.name}
											/>
											<div
												className={classNames([cssClasses.flexColumn, "user"])}>
												<p className="name">{user.name}</p>
												<p className="username">{user.username}</p>
											</div>
										</div>
									</td>
									<td className="answer">{user.answer}</td>
									<td className="created">{user.created}</td>
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
