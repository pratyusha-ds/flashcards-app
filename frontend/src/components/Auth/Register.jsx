import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validate = () => {
    if (!name.trim()) {
      setError("Username is required");
      return false;
    }
    if (!email.includes("@")) {
      setError("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError(null);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(email, password, name);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4 font-cute">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-10 rounded-3xl shadow-form-neumorphism bg-[var(--form-bg)] flex flex-col gap-6 transition-all"
      >
        <h2 className="text-4xl font-bold text-center text-[var(--text-color)]">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-[var(--input-bg)] text-[var(--text-color)] shadow-deep-inset
                     focus:outline-none focus:shadow-none transition placeholder:text-[var(--placeholder-color)]"
        />

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
          Register
        </button>

        <p className="text-center text-[var(--text-color)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-[var(--text-color)] hover:text-[var(--text-color)]/80"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
