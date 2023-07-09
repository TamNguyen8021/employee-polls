import classNames from "classnames";
import { cssClasses } from "cssClasses";

const OptionField = ({ isFirst = true, handleChange }) => {
	return (
		<div className={classNames([cssClasses.flexColumn, "option"])}>
			<h1 className="option-title">
				{isFirst ? "First Option" : "Second Option"}
			</h1>
			<input
				className="option-field"
				type="text"
				placeholder={isFirst ? "Option One" : "Option Two"}
				onChange={handleChange}
			/>
		</div>
	);
};

export default OptionField;
