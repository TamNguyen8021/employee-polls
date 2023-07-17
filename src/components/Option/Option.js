import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { fetchPolls, votePoll } from "reducers/pollSlice";
import { fetchUsers } from "reducers/userSlice";
import { cssClasses } from "cssClasses";

const Option = ({
	pollId,
	isFirst = true,
	content,
	isSelected = false,
	isAnswered = false,
	noOfVotes,
	noOfUsers,
}) => {
	const location = useLocation();
	const dispatch = useDispatch();

	const handleSelectOption = () => {
		dispatch(
			votePoll({
				authedUser: location.state.id,
				qid: pollId,
				answer: isFirst ? "optionOne" : "optionTwo",
			}),
		);
		dispatch(fetchPolls());
		dispatch(fetchUsers());
	};

	const renderUI = () => {
		if (!isAnswered) {
			return (
				<input
					className="btn-click"
					type="button"
					value="Click"
					onClick={handleSelectOption}
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
	pollId: PropTypes.string,
	isFirst: PropTypes.bool.isRequired,
	content: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isAnswered: PropTypes.bool.isRequired,
	noOfVotes: PropTypes.number,
	noOfUsers: PropTypes.number,
};

export default Option;
