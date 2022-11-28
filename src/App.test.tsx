import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// const currencyConverterTitleElement = screen.getByText(/Currency/i);
// const currencyConvertInputElement = screen.getByTestId('from');
// const currencyConvertOutputElement = screen.getByTestId('to');

const setup = () => {
    render(<App colorScheme="light" />);
}

test("renders title", () => {
});

// test("converts currency", () => {
//     setup()
//     fireEvent.change(currencyConvertInputElement, {target: {value: '23'}})
//     // expect(currencyConvertOutputElement.value).toBe('$23')
// })
