const {
	render,
	getByTestId,
	screen,
	fireEvent,
} = require("@testing-library/react");
const { default: InputField } = require("./InputField");

describe("InputField component", () => {
	test("should renders label if label value is provided", () => {
		const props = {
			label: "Label",
			onChange: jest.fn(),
		};

		render(<InputField {...props} />);

		const label = screen.getByTestId("input-field-label");

		expect(label).toBeInTheDocument();
	});

	test("should not render label if label value is not provided", () => {
		const props = {
			onChange: jest.fn(),
		};

		render(<InputField {...props} />);

		const label = screen.queryByTestId("input-field-label");

		expect(label).not.toBeInTheDocument();
	});

	test("should renders placeholder if placeholder value is provided", () => {
		const props = {
			placeholder: "Placeholder",
			onChange: jest.fn(),
		};

		render(<InputField {...props} />);

		const inputField = screen.getByTestId("input-field");

		expect(inputField).toBeInTheDocument();
		expect(inputField.placeholder).toEqual(props.placeholder);
	});

	test("should renders default value if value is provided", () => {
		const props = {
			value: "Value",
			onChange: jest.fn(),
		};

		render(<InputField {...props} />);

		const inputField = screen.getByTestId("input-field");

		expect(inputField).toBeInTheDocument();
		expect(inputField.value).toEqual(props.value);
	});

	test("should triggers change event when user inputs in field", () => {
		const props = {
			onChange: jest.fn(),
		};

		render(<InputField {...props} />);

		const inputField = screen.getByTestId("input-field");
		fireEvent.change(inputField, { target: { value: "test" } });

		expect(inputField).toBeInTheDocument();
		expect(inputField.value).toEqual("test");
	});
});
