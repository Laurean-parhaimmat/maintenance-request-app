import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../components/NotFound";

describe("NotFound", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms the 404 heading and home link are rendered properly.
  it("renders the 404 heading and a link back to home", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "404 - Not Found!" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});