import classNames from "classnames";
import PollOverview from "../PollOverview";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the section which categorize polls by status
 */
const PollSection = ({ title }) => {
	return (
		<div className={classNames([cssClasses.flexColumn, "poll-section"])}>
			<h1>{title}</h1>
			<PollOverview
				title="abc"
				time="2023-02-02 13:50:00"
			/>
		</div>
	);
};

export default PollSection;
