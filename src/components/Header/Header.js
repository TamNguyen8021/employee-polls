import { HOME, LEADERBOARD, NEW, LOGOUT } from "constants";
import { useState } from "react";
import classNames from "classnames";
import { cssClasses } from "cssClasses";

/**
 * @description Represents the navigation header
 */
const Header = (props) => {
	const headers = [HOME, LEADERBOARD, NEW];
	const [selectedHeader, setSelectedHeader] = useState(HOME);

	const handleSelectHeader = (header) => {
		setSelectedHeader(header);
	};

	return (
		<div className={classNames([cssClasses.flex, "header"])}>
			<nav>
				<ul className={classNames([cssClasses.flex, "list-menu"])}>
					{headers.map((header) => (
						<li
							key={header}
							className={classNames([
								"menu-header",
								{ selected: selectedHeader === header },
							])}
							onClick={() => handleSelectHeader(header)}>
							{header}
						</li>
					))}
				</ul>
			</nav>
			<button
				className="btn-logout"
				type="button"
				value={LOGOUT}>
				{LOGOUT}
			</button>
		</div>
	);
};

export default Header;
