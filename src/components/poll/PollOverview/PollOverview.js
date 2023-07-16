import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import { POLL_PATH } from "constants";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the poll shown on home page
 */
const PollOverview = ({ title, time, pollId, isAnswered = false }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleShowPoll = () => {
		navigate(POLL_PATH + pollId, {
			state: { id: location.state.id, pollId: pollId, isAnswered: isAnswered },
		});
	};

	return (
		<div className={classNames(cssClasses.flexColumn, "poll-overview")}>
			<p className="poll-title">{title}</p>
			<p className="poll-time">{moment(time).format("LT | l")}</p>
			<input
				className="btn-show"
				type="button"
				value="Show"
				onClick={handleShowPoll}
			/>
		</div>
	);
};

PollOverview.propTypes = {
	title: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
	pollId: PropTypes.string.isRequired,
	isAnswered: PropTypes.bool.isRequired,
};

export default PollOverview;
