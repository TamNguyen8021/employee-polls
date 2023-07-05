import PollOverview from "../PollOverview";

/**
 * @description Represents the section which categorize polls by status
 */
const PollSection = ({ title }) => {
	return (
		<div className="poll-section">
			<h1>{title}</h1>
			<PollOverview
				title="abc"
				time="2023-02-02 13:50:00"
			/>
		</div>
	);
};

export default PollSection;
