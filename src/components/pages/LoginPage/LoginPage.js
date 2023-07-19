import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";
import {
	login,
	selectIsAuthorized,
	selectIsUserDataLoading,
} from "reducers/userSlice";
import { USER, PASSWORD, HOME_PATH } from "constants";
import { cssClasses } from "cssClasses";
import InputField from "components/InputField";
import SubmitButton from "components/buttons/SubmitButton";
import loginDecor from "images/login-decor.jpg";

/**
 * @description Represents the login page
 */
const LoginPage = () => {
	const location = useLocation();
	const isAuthorized = useSelector(selectIsAuthorized);
	const isUserDataLoading = useSelector(selectIsUserDataLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);

	useEffect(() => {
		if (isAuthorized) {
			clearInputFields();
			navigate(location.state?.from ? location.state.from : HOME_PATH, {
				state: { id: id },
			});
		}
	}, [isAuthorized]);

	const handleChangeId = (event) => {
		setId(event?.target?.value);

		if (isSubmitButtonClicked) {
			setIsSubmitButtonClicked(false);
		}
	};

	const handleChangePassword = (event) => {
		setPassword(event?.target?.value);

		if (isSubmitButtonClicked) {
			setIsSubmitButtonClicked(false);
		}
	};

	const checkIfSubmitButtonDisabled = () => {
		return (
			!id.replaceAll(" ", "").length || !password.replaceAll(" ", "").length
		);
	};

	const clearInputFields = () => {
		setId("");
		setPassword("");
	};

	const handleSubmit = () => {
		dispatch(
			login({
				id: id,
				password: password,
			}),
		);
		setIsSubmitButtonClicked(true);
	};

	if (isUserDataLoading) {
		return <ClipLoader loading={isUserDataLoading} />;
	}

	return (
		<div className="login-page">
			<h1>Employee Polls</h1>
			<div className={classNames([cssClasses.flex])}>
				<img
					className="login-decor"
					src={loginDecor}
					alt="Vote illustration - Designed by Freepik (www.freepik.com)"
				/>
			</div>

			<h1>Log In</h1>
			{isSubmitButtonClicked && !isAuthorized ? (
				<p>Incorrect username or password</p>
			) : null}
			<InputField
				label={USER}
				isPassword={false}
				placeholder={USER}
				value={id}
				onChange={handleChangeId}
			/>
			<InputField
				label={PASSWORD}
				isPassword
				placeholder={PASSWORD}
				value={password}
				onChange={handleChangePassword}
			/>
			<SubmitButton
				disabled={checkIfSubmitButtonDisabled()}
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default LoginPage;
