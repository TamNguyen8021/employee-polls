import classNames from "classnames";
import PropTypes from "prop-types";
import { cssClasses } from "cssClasses";

const Option = ({
	content,
	isSelected = false,
	isAnswered = false,
	noOfVotes,
	noOfUsers,
}) => {
	const renderUI = () => {
		if (!isAnswered) {
			return (
				<input
					className="btn-click"
					type="button"
					value="Click"
				/>
			);
		}

		if (isSelected) {
			return (
				<>
					<input
						className="btn-click disabled"
						type="button"
						value="Selected"
						disabled
					/>
					<p className="votes">
						Votes: {noOfVotes} ({(noOfVotes / noOfUsers) * 100}%)
					</p>
				</>
			);
		}
	};
	return (
		<div className={classNames([cssClasses.flexColumn, "option-in-poll"])}>
			<p>{content}</p>
			{renderUI()}
		</div>
	);
};

Option.propTypes = {
	content: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isAnswered: PropTypes.bool.isRequired,
	noOfVotes: PropTypes.number,
	noOfUsers: PropTypes.number,
};

export default Option;
