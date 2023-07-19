import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { createPoll, selectHasErrors } from "reducers/pollSlice";
import { HOME_PATH, LOGIN_PATH, NEW_PATH } from "constants";
import { cssClasses } from "cssClasses";
import OptionField from "components/OptionField";
import SubmitButton from "components/buttons/SubmitButton";

const NewPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const hasErrors = useSelector(selectHasErrors);
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");

	useEffect(() => {
		if (!location.state?.id) {
			navigate(LOGIN_PATH, { state: { from: NEW_PATH } });
		}

		sessionStorage.removeItem("pollId");
		sessionStorage.removeItem("pollTime");
	});

	const userId = location.state?.id;

	const handleChangeOptionOne = (event) => {
		setOptionOne(event?.target?.value);
	};

	const handleChangeOptionTwo = (event) => {
		setOptionTwo(event?.target?.value);
	};

	const checkIfSubmitButtonDisabled = () => {
		return (
			!optionOne.replaceAll(" ", "").length ||
			!optionTwo.replaceAll(" ", "").length
		);
	};

	const handleSubmit = () => {
		dispatch(
			createPoll({
				optionOneText: optionOne,
				optionTwoText: optionTwo,
				author: userId,
			}),
		);

		if (!hasErrors) {
			navigate(HOME_PATH, { state: { id: userId } });
		}
	};

	return (
		<div className="new-page">
			{hasErrors ? <p>Some errors occured. Please try again</p> : null}
			<h1 className="title">Would You Rather</h1>
			<h2 className="sub-title">Create Your Own Poll</h2>
			<div className={classNames([cssClasses.flexColumn, "option-container"])}>
				<OptionField
					isFirst
					handleChange={handleChangeOptionOne}
				/>
				<OptionField
					isFirst={false}
					handleChange={handleChangeOptionTwo}
				/>
			</div>

			<SubmitButton
				disabled={checkIfSubmitButtonDisabled()}
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default NewPage;
