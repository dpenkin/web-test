import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import Form from "./index";

describe("Test render form component", () => {
  render(<Form />);

  it('should render component form', () => {
    const buttonElement = screen.getByRole('button');
    const inputNameElement = screen.getByPlaceholderText(/Name/i);
    const inputDescriptionElement = screen.getByPlaceholderText(/Description/i);
    expect(buttonElement).toBeInTheDocument();
    expect(inputNameElement).toBeInTheDocument();
    expect(inputDescriptionElement).toBeInTheDocument();
  })
});
