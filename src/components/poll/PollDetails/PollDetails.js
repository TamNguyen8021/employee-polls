import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames";
import {
	fetchPolls,
	selectIsPollDataLoading,
	selectPollById,
} from "reducers/pollSlice";
import {
	fetchUsers,
	selectIsUserDataLoading,
	selectUserById,
	selectUsers,
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
	const users = useSelector(selectUsers);

	const userId = location.state.id;
	const isAnswered = location.state.isAnswered;

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchPolls());
	}, []);

	if (isUserDataLoading || isPollDataLoading) {
		return <ClipLoader loading={isUserDataLoading || isPollDataLoading} />;
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
					noOfVotes={poll.optionOne.votes.length}
					noOfUsers={users.length}
				/>
				<Option
					content={poll.optionTwo.text}
					isSelected={poll.optionTwo.votes.includes(userId)}
					isAnswered={isAnswered}
					noOfVotes={poll.optionTwo.votes.length}
					noOfUsers={users.length}
				/>
			</div>
		</div>
	);
};

export default PollDetails;
