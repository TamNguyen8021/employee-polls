const { render, getByTestId, fireEvent } = require("@testing-library/react");
const { default: Header } = require("./Header");
const { HOME } = require("constants");

describe("Header component", () => {
	test("should renders home page if clicks home header", () => {
		render(<Header />);
		const home = getByTestId(HOME);
		const homePage = getByTestId("home-page");
		fireEvent.click(home);
		expect(homePage).toBeInTheDocument();
	});
});
