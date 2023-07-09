import { useState } from "react";
import classNames from "classnames";
import OptionField from "components/OptionField";
import SubmitButton from "components/buttons/SubmitButton";
import { cssClasses } from "cssClasses";

const NewPage = () => {
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");

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

	return (
		<div className="new-page">
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

			<SubmitButton disabled={checkIfSubmitButtonDisabled} />
		</div>
	);
};

export default NewPage;
