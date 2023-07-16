import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import PollOverview from "../PollOverview";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the section which categorize polls by status
 */
const PollSection = ({ title, polls }) => {
	return (
		<div className={classNames([cssClasses.flexColumn, "poll-section"])}>
			<h1>{title}</h1>
			{polls?.length ? (
				<div className={classNames(cssClasses.grid, "poll-section-grid")}>
					{polls
						.sort((firstPoll, secondPoll) =>
							moment(secondPoll.timestamp).diff(moment(firstPoll.timestamp)),
						)
						.map((poll) => {
							return (
								<PollOverview
									key={poll.id}
									title={poll.author}
									time={poll.timestamp}
									pollId={poll.id}
								/>
							);
						})}
				</div>
			) : null}
		</div>
	);
};

PollSection.propTypes = {
	title: PropTypes.string.isRequired,
	polls: PropTypes.array.isRequired,
};

export default PollSection;
