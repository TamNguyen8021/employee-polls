import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the submit button used when login or create a new poll
 */
const SubmitButton = (props) => {
	return (
		<div className={classNames([cssClasses.flex])}>
			<input
				className="btn-submit"
				type="submit"
				value="Submit"
			/>
		</div>
	);
};

export default SubmitButton;
