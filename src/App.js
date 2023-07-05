import "./App.css";
import Header from "components/Header";
import HomePage from "components/pages/HomePage";
import PollSection from "components/poll/PollSection";

const App = (props) => {
	return (
		<div className="App">
			<Header />
			<HomePage>
				<PollSection title="New Questions" />
			</HomePage>
		</div>
	);
};

export default App;
