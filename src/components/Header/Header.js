import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
	HOME,
	LEADERBOARD,
	LOGOUT,
	NEW,
	HOME_PATH,
	LEADERBOARD_PATH,
	LOGIN_PATH,
	NEW_PATH,
} from "constants";
import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the navigation header
 */
const Header = ({ onClick }) => {
	const navigate = useNavigate();
	const headers = [
		{ name: HOME, path: HOME_PATH },
		{ name: LEADERBOARD, path: LEADERBOARD_PATH },
		{ name: NEW, path: NEW_PATH },
	];
	const [selectedHeader, setSelectedHeader] = useState(HOME);

	const handleSelectHeader = (header) => {
		setSelectedHeader(header);
		navigate(header.path);
	};

	return (
		<div className={classNames([cssClasses.flex, "header"])}>
			<nav>
				<ul className={classNames([cssClasses.flex, "list-menu"])}>
					{headers.map((header) => (
						<li
							key={header.name}
							className={classNames([
								"menu-header",
								{ selected: selectedHeader === header },
							])}
							onClick={() => handleSelectHeader(header)}>
							{header.name}
						</li>
					))}
				</ul>
			</nav>
			<Link to={LOGIN_PATH}>
				<input
					className="btn-logout"
					type="button"
					value={LOGOUT}
					onClick={onClick}
				/>
			</Link>
		</div>
	);
};

Header.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default Header;
