import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { LOGIN_PATH, NOT_FOUND_PATH } from "constants";
import { cssClasses } from "cssClasses";
import Option from "components/Option";

const PollDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isPollDataLoading = useSelector(selectIsPollDataLoading);
	const isUserDataLoading = useSelector(selectIsUserDataLoading);
	const poll = useSelector((state) =>
		selectPollById(
			state,
			location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
		),
	);
	const user = useSelector((state) => selectUserById(state, poll?.author));
	const users = useSelector(selectUsers);

	const userId = location.state?.id;

	useEffect(() => {
		if (!location.state?.id) {
			navigate(LOGIN_PATH, { state: { from: location.pathname } });
		} else {
			dispatch(fetchPolls());

			if (poll?.id) {
				dispatch(fetchUsers());
			}
		}
	}, []);

	if (isUserDataLoading || isPollDataLoading) {
		return <ClipLoader loading={isUserDataLoading || isPollDataLoading} />;
	}

	if (!poll?.id) {
		navigate(NOT_FOUND_PATH);
	}

	const checkIfUserAnsweredPoll = () => {
		return (
			poll?.optionOne.votes.includes(userId) ||
			poll?.optionTwo.votes.includes(userId)
		);
	};

	return (
		<div className={classNames([cssClasses.flexColumn, "poll-details"])}>
			<h1>Poll by {user?.id}</h1>
			<img
				className="avatar"
				src={user?.avatarURL}
				alt={"Avatar of " + user?.id}
			/>
			<h2>Would You Rather</h2>
			<div className={classNames([cssClasses.flex, "options"])}>
				<Option
					pollId={poll?.id}
					isFirst
					content={poll?.optionOne.text}
					isSelected={poll?.optionOne.votes.includes(userId)}
					isAnswered={checkIfUserAnsweredPoll()}
					noOfVotes={poll?.optionOne.votes.length}
					noOfUsers={users.length}
				/>
				<Option
					pollId={poll?.id}
					isFirst={false}
					content={poll?.optionTwo.text}
					isSelected={poll?.optionTwo.votes.includes(userId)}
					isAnswered={checkIfUserAnsweredPoll()}
					noOfVotes={poll?.optionTwo.votes.length}
					noOfUsers={users.length}
				/>
			</div>
		</div>
	);
};

export default PollDetails;
