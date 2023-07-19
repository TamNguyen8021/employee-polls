import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_PATH, NOT_FOUND_PATH } from "constants";

const NotFoundPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!location.state?.id) {
			navigate(LOGIN_PATH, { state: { from: NOT_FOUND_PATH } });
		}
	}, []);

	return (
		<div>
			<h1>Page Not Found</h1>
			<p>Did you enter correct url?</p>
		</div>
	);
};

export default NotFoundPage;
