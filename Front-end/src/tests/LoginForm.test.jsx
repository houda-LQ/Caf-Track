import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "../components/LoginForm";

//    MOCK REACT ROUTER

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// MOCK ZUSTAND STORE
const mockLogin = vi.fn();

vi.mock("../store/authStore", () => ({
  useAuthStore: (selector) =>
    selector({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: mockLogin,
    }),
}));

/* TESTS */
describe("LoginForm", () => {

  it("affiche le formulaire de connexion", () => {
    render(<LoginForm />);

    expect(screen.getByText("Se connecter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Votre email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  it("permet à l’utilisateur de saisir email et mot de passe", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Votre email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "123456" },
    });

    expect(screen.getByPlaceholderText("Votre email").value).toBe("test@mail.com");
    expect(screen.getByPlaceholderText("********").value).toBe("123456");
  });

  it("appelle login et redirige vers dashboard si succès", async () => {
    mockLogin.mockResolvedValue(true);

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Votre email"), {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@mail.com", "123456");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

});
