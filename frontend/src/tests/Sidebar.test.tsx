import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const { mockNavigate, mockSignOut } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../lib/auth-client", () => ({
  authClient: {
    signOut: mockSignOut,
  },
}));

describe("Sidebar", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    mockNavigate.mockReset();
    mockSignOut.mockReset();
  });

  // Confirms navigation links and logout button are rendered with expected routes.
  it("renders navigation links and logout button", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Etusivu" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Uusi pyyntö" })).toHaveAttribute(
      "href",
      "/request/new",
    );
    expect(
      screen.getByRole("button", { name: "Kirjaudu ulos" }),
    ).toBeInTheDocument();
  });

  // Confirms clicking logout calls signOut and navigates to /login on success.
  it("signs out and navigates to /login when logout succeeds", async () => {
    mockSignOut.mockResolvedValue({ error: null });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Kirjaudu ulos" }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
  });

  // Confirms failed signOut logs an error and does not redirect to /login.
  it("does not navigate when signOut returns an error", async () => {
    mockSignOut.mockResolvedValue({ error: { message: "Logout failed" } });
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Kirjaudu ulos" }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Uloskirjautuminen epäonnistui",
      );
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});