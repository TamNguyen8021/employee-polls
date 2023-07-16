import classNames from "classnames";
import PropTypes from "prop-types";
import { cssClasses } from "cssClasses";

const Option = ({ content, isSelected = false, isAnswered = false }) => {
	const renderButton = () => {
		if (!isAnswered) {
			return (
				<input
					className="btn-click"
					type="button"
					value="Click"
				/>
			);
		}

		if (isSelected) {
			return (
				<input
					className="btn-click disabled"
					type="button"
					value="Selected"
					disabled
				/>
			);
		}
	};
	return (
		<div className={classNames([cssClasses.flexColumn, "option-in-poll"])}>
			<p>{content}</p>
			{renderButton()}
		</div>
	);
};

Option.propTypes = {
	content: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isAnswered: PropTypes.bool.isRequired,
};

export default Option;
