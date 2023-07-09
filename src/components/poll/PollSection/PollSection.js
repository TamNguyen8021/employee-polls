import classNames from "classnames";
import PollOverview from "../PollOverview";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the section which categorize polls by status
 */
const PollSection = ({ title }) => {
	const polls = [
		{ id: 1, title: "abc", time: "2023-02-02 13:50:00" },
		{ id: 2, title: "xyz", time: "2023-02-03 10:30:00" },
		{ id: 3, title: "ab1c", time: "2023-02-04 09:20:00" },
		{ id: 4, title: "a2bc", time: "2023-02-05 06:00:00" },
	];
	return (
		<div className={classNames([cssClasses.flexColumn, "poll-section"])}>
			<h1>{title}</h1>
			{polls?.length ? (
				<div className={classNames(cssClasses.grid, "poll-section-grid")}>
					{polls.map((poll) => {
						return (
							<PollOverview
								key={poll.id}
								title={poll.title}
								time={poll.time}
							/>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default PollSection;
