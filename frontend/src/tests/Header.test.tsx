import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms the brand logo, title, and header action buttons are rendered.
  it("renders brand logo, title, and action buttons", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();

    const logo = screen.getByAltText("Huoltopyyntö");
    expect(logo).toHaveAttribute("src", "/company-logo.svg");

    expect(screen.getByText("Huoltopyyntö")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ilmoitukset" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Käyttäjä" }),
    ).toBeInTheDocument();
  });
});