import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Input from "../components/Input";

describe("Input", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms the label connects to the input and attributes are applied.
  it("renders label, placeholder, value, and type correctly", () => {
    render(
      <Input
        type="email"
        label="Sähköposti"
        value="testi@esimerkki.fi"
        name="email"
        placeholder="Syötä sähköposti"
        onChange={() => {}}
      />,
    );

    const input = screen.getByLabelText("Sähköposti");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("placeholder", "Syötä sähköposti");
    expect(input).toHaveValue("testi@esimerkki.fi");
  });

  // Confirms typing into the input triggers the onChange callback.
  it("calls onChange when user types into the input", () => {
    const handleChange = vi.fn();

    render(
      <Input
        type="text"
        label="Otsikko"
        value=""
        name="title"
        placeholder="Kirjoita otsikko"
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Otsikko"), {
      target: { value: "Hana vuotaa" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Confirms error message is displayed when the error prop is provided.
  it("renders an error message when error prop is passed", () => {
    render(
      <Input
        type="password"
        label="Salasana"
        value=""
        name="password"
        placeholder="Syötä salasana"
        error="Salasana on pakollinen"
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Salasana on pakollinen")).toBeInTheDocument();
  });

  // Confirms the input is disabled when disabled prop is true.
  it("disables the input when disabled prop is true", () => {
    render(
      <Input
        type="text"
        label="Käyttäjätunnus"
        value="käyttäjä"
        name="username"
        placeholder="Käyttäjätunnus"
        disabled
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Käyttäjätunnus")).toBeDisabled();
  });
});