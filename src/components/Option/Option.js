import classNames from "classnames";
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

export default Option;
