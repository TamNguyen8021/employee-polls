import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
	HOME,
	LEADERBOARD,
	LOGOUT,
	NEW,
	HOME_PATH,
	LEADERBOARD_PATH,
	NEW_PATH,
} from "constants";
import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the navigation header
 */
const Header = ({ onClick }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const userId = location.state.id;
	const headers = [
		{ name: HOME, path: HOME_PATH },
		{ name: LEADERBOARD, path: LEADERBOARD_PATH },
		{ name: NEW, path: NEW_PATH },
	];
	const [selectedHeader, setSelectedHeader] = useState(HOME);

	const handleSelectHeader = (header) => {
		setSelectedHeader(header.name);
		navigate(header.path, { state: { id: userId } });
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
								{ selected: selectedHeader === header.name },
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
						src={
							"https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Round&hairColor=Auburn&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=Angry&mouthType=Default&skinColor=Tanned"
						}
						alt={"Avatar of " + userId}
					/>
					<span className="user-id">{userId}</span>
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
