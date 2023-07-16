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

const PollDetails = ({ username }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isPollDataLoading = useSelector(selectIsPollDataLoading);
	const isUserDataLoading = useSelector(selectIsUserDataLoading);
	const poll = useSelector((state) =>
		selectPollById(state, location.state.pollId),
	);
	const user = useSelector((state) => selectUserById(state, username));

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchPolls());
	}, []);

	if (isUserDataLoading || isPollDataLoading) {
		return <CircleLoader loading={isUserDataLoading || isPollDataLoading} />;
	}

	return (
		<div className={classNames([cssClasses.flexColumn, "poll-details"])}>
			<h1>Poll by {username}</h1>
			<img
				className="avatar"
				src={user.avatarURL}
				alt={"Avatar of " + username}
			/>
			<h2>Would You Rather</h2>
			<div className={classNames([cssClasses.flex, "options"])}>
				<Option content={poll.optionOne.text} />
				<Option content={poll.optionTwo.text} />
			</div>
		</div>
	);
};

PollDetails.propTypes = {
	username: PropTypes.string,
};

export default PollDetails;
