/**
 * @description Represents the poll shown on home page
 */
const PollOverview = ({ title, time }) => {
	return (
		<div className="poll-overview">
			<p>{title}</p>
			<p>{time}</p>
			<button
				className="btn-show"
				type="button"
				value="Show"></button>
		</div>
	);
};

export default PollOverview;
