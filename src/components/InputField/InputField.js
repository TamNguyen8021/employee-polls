import PropTypes from "prop-types";

const InputField = ({
	label,
	isPassword = false,
	placeholder = "",
	value,
	onChange,
}) => {
	return (
		<div className="input-field">
			{label ? <label className="label">{label}</label> : null}
			<input
				className="field"
				type={isPassword ? "password" : "text"}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string,
	isPassword: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default InputField;
