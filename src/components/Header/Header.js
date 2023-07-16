import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import {
	fetchUsers,
	selectIsUserDataLoading,
	selectUserById,
} from "reducers/userSlice";
import {
	HOME,
	LEADERBOARD,
	LOGOUT,
	NEW,
	HOME_PATH,
	LEADERBOARD_PATH,
	NEW_PATH,
} from "constants";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the navigation header
 */
const Header = ({ onClick }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => selectUserById(state, location.state.id));
	const isUserDataLoading = useSelector(selectIsUserDataLoading);
	const [selectedHeader, setSelectedHeader] = useState(HOME);

	const headers = [
		{ name: HOME, path: HOME_PATH },
		{ name: LEADERBOARD, path: LEADERBOARD_PATH },
		{ name: NEW, path: NEW_PATH },
	];

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	const handleSelectHeader = (header) => {
		setSelectedHeader(header.name);
		navigate(header.path, { state: { id: user.id } });
	};

	if (isUserDataLoading) {
		return <ClipLoader loading={isUserDataLoading} />;
	}

	return (
		<div className={classNames([cssClasses.flex, "header"])}>
			<nav>
				<ul className={classNames([cssClasses.flex, "list-menu"])}>
					{headers.map((header) => (
						<li
							key={header.name}
							className={classNames([
								"menu-header",
								/*{ selected: selectedHeader === header.name },*/
							])}
							onClick={() => handleSelectHeader(header)}>
							{header.name}
						</li>
					))}
				</ul>
			</nav>
			<div className={classNames([cssClasses.flex, "header-right"])}>
				<div className={classNames([cssClasses.flex, "user-overview"])}>
					<img
						className="user-avatar"
						src={user.avatarURL}
						alt={"Avatar of " + user.id}
					/>
					<span className="user-id">{user.id}</span>
				</div>
				<input
					className="btn-logout"
					type="button"
					value={LOGOUT}
					onClick={onClick}
				/>
			</div>
		</div>
	);
};

Header.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default Header;
