import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import Form from "./index";

describe("Form component", () => {
  render(<Form />);

  it('render components', () => {
    const buttonElement = screen.getByRole('button');
    const inputNameElement = screen.getByPlaceholderText(/Name/i);
    const inputDescriptionElement = screen.getByPlaceholderText(/Description/i);
    expect(buttonElement).toBeInTheDocument();
    expect(inputNameElement).toBeInTheDocument();
    expect(inputDescriptionElement).toBeInTheDocument();
  })
});
