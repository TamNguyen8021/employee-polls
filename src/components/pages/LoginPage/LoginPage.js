import InputField from "components/InputField";
import SubmitButton from "components/buttons/SubmitButton";
import { USER, PASSWORD } from "constants";
import loginDecor from "images/login-decor.jpg";

/**
 * @description Represents the login page
 */
const LoginPage = (props) => {
	return (
		<div className="login-page">
			<h1>Employee Polls</h1>
			<div className="flex">
				<img
					className="login-decor"
					src={loginDecor}
					alt="Vote illustration - Designed by Freepik (www.freepik.com)"
				/>
			</div>

			<h1>Log In</h1>
			<InputField
				label={USER}
				isPassword={false}
				placeholder={USER}
			/>
			<InputField
				label={PASSWORD}
				isPassword
				placeholder={PASSWORD}
			/>
			<SubmitButton />
		</div>
	);
};

export default LoginPage;
