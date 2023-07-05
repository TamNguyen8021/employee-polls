/**
 * @description Represents the submit button used when login or create a new poll
 */
const SubmitButton = (props) => {
	return (
		<div className="flex">
			<input
				className="btn-submit"
				type="submit"
				value="Submit"
			/>
		</div>
	);
};

export default SubmitButton;
