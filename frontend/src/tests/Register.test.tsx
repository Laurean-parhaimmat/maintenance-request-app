import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/Register";

const { signUpEmail } = vi.hoisted(() => ({ signUpEmail: vi.fn() }));

vi.mock("../lib/auth-client", () => ({
  authClient: { signUp: { email: signUpEmail } },
}));

describe("RegisterPage", () => {
  // Confirms mismatched passwords show a validation error and block registration.
  it("shows an error when the password confirmation does not match", async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Nimi"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Sähköposti"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      screen.getByLabelText("Salasana", { selector: "#password" }),
      {
        target: { value: "password123" },
      },
    );
    fireEvent.change(screen.getByLabelText("Vahvista Salasana"), {
      target: { value: "different123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Luo Käyttäjä" }));

    expect(
      await screen.findByText("Salasanat eivät täsmää"),
    ).toBeInTheDocument();
    await waitFor(() => expect(signUpEmail).not.toHaveBeenCalled());
  });
});
