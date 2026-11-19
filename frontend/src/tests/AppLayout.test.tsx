import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";

vi.mock("../components/Header", () => ({
  default: () => <header data-testid="mock-header">Header</header>,
}));

vi.mock("../components/Sidebar", () => ({
  default: () => <aside data-testid="mock-sidebar">Sidebar</aside>,
}));

describe("AppLayout", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms AppLayout renders Header, Sidebar, and the nested route Outlet content.
  it("renders Header, Sidebar, and nested route content via Outlet", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<div>Sivun sisältö</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Sivun sisältö");
  });
});