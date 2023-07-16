import classNames from "classnames";
import PropTypes from "prop-types";
import { cssClasses } from "cssClasses";

const Option = ({ content }) => {
	return (
		<div className={classNames([cssClasses.flexColumn, "option-in-poll"])}>
			<p>{content}</p>
			<input
				className="btn-click"
				type="button"
				value="Click"
			/>
		</div>
	);
};

Option.propTypes = {
	content: PropTypes.string.isRequired,
};

export default Option;
