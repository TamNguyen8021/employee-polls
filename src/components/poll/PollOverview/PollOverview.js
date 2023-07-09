import moment from "moment";
import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the poll shown on home page
 */
const PollOverview = ({ title, time }) => {
	return (
		<div className={classNames(cssClasses.flexColumn, "poll-overview")}>
			<p className="poll-title">{title}</p>
			<p className="poll-time">{moment(time).format("LT | l")}</p>
			<input
				className="btn-show"
				type="button"
				value="Show"
			/>
		</div>
	);
};

export default PollOverview;
