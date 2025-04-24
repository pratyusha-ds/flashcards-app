import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4 font-cute">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-10 rounded-3xl shadow-form-neumorphism bg-[var(--form-bg)] flex flex-col gap-6 transition-all"
      >
        <h2 className="text-4xl font-bold text-center text-[var(--text-color)]">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-[var(--input-bg)] text-[var(--text-color)] shadow-deep-inset
                     focus:outline-none focus:shadow-none transition placeholder:text-[var(--placeholder-color)]"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[var(--input-bg)] text-[var(--text-color)] shadow-deep-inset
                     focus:outline-none focus:shadow-none transition placeholder:text-[var(--placeholder-color)]"
        />

        <button
          type="submit"
          className="w-full p-4 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism
                     hover:shadow-button-neumorphism-hover font-semibold text-[var(--text-color)]
                     transition"
        >
          Login
        </button>

        <p className="text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-[var(--text-color)]">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
