import classNames from "classnames";
import Option from "components/Option";
import { cssClasses } from "cssClasses";

const PollDetails = ({ username, avatar }) => {
	const options = [
		{
			id: 1,
			content: "ABC",
		},
		{ id: 2, content: "XYZ" },
	];
	return (
		<div className={classNames([cssClasses.flexColumn, "poll-details"])}>
			<h1>Poll by {username}</h1>
			<img
				className="avatar"
				src={avatar}
				alt={"Avatar of " + username}
			/>
			<h2>Would You Rather</h2>
			<div className={classNames([cssClasses.flex, "options"])}>
				{options.map((option) => {
					return (
						<Option
							key={option.id}
							content={option.content}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PollDetails;
