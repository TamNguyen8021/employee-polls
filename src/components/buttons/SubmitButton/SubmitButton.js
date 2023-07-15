import classNames from "classnames";
import PropTypes from "prop-types";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the submit button used when login or create a new poll
 */
const SubmitButton = ({ disabled, onClick }) => {
	return (
		<div className={classNames([cssClasses.flex])}>
			<input
				className={classNames(["btn-submit", { disabled: disabled }])}
				type="button"
				value="Submit"
				disabled={disabled}
				onClick={() => onClick()}
			/>
		</div>
	);
};

SubmitButton.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
