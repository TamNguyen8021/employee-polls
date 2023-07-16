import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
	fetchPolls,
	selectIsPollDataLoading,
	selectPollById,
} from "reducers/pollSlice";
import {
	fetchUsers,
	selectIsUserDataLoading,
	selectUserById,
} from "reducers/userSlice";
import { cssClasses } from "cssClasses";
import Option from "components/Option";

const PollDetails = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isPollDataLoading = useSelector(selectIsPollDataLoading);
	const isUserDataLoading = useSelector(selectIsUserDataLoading);
	const poll = useSelector((state) =>
		selectPollById(state, location.state.pollId),
	);
	const user = useSelector((state) => selectUserById(state, poll?.author));

	const userId = location.state.id;
	const isAnswered = location.state.isAnswered;

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchPolls());
	}, []);

	if (isUserDataLoading || isPollDataLoading) {
		return <CircleLoader loading={isUserDataLoading || isPollDataLoading} />;
	}

	return (
		<div className={classNames([cssClasses.flexColumn, "poll-details"])}>
			<h1>Poll by {user.id}</h1>
			<img
				className="avatar"
				src={user.avatarURL}
				alt={"Avatar of " + user.id}
			/>
			<h2>Would You Rather</h2>
			<div className={classNames([cssClasses.flex, "options"])}>
				<Option
					content={poll.optionOne.text}
					isSelected={poll.optionOne.votes.includes(userId)}
					isAnswered={isAnswered}
				/>
				<Option
					content={poll.optionTwo.text}
					isSelected={poll.optionTwo.votes.includes(userId)}
					isAnswered={isAnswered}
				/>
			</div>
		</div>
	);
};

export default PollDetails;
