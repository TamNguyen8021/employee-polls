const InputField = ({ label, isPassword, placeholder }) => {
	return (
		<div className="input-field">
			<label className="label">{label}</label>
			<input
				className="field"
				type={isPassword ? "password" : "text"}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputField;
