import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the submit button used when login or create a new poll
 */
const SubmitButton = ({ disabled }) => {
	return (
		<div className={classNames([cssClasses.flex])}>
			<input
				className={classNames(["btn-submit", { disabled: disabled() }])}
				type="submit"
				value="Submit"
				disabled={disabled}
			/>
		</div>
	);
};

export default SubmitButton;
