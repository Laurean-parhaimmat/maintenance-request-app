import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms the button renders with the provided type attribute.
  it("renders a button with the given type", () => {
    render(<Button type="submit" />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  // Confirms clicking the button triggers the onClick callback.
  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button type="button" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});