import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import { FaBookOpen, FaUserCircle, FaSignInAlt } from "react-icons/fa";

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col items-center justify-center p-8 font-cute px-6 relative">
      {user && <Navbar />}

      <h1 className="text-5xl font-extrabold mb-8 text-[var(--text-color)] tracking-wide animate-fadeInDown text-center w-full max-w-4xl">
        Flashcards Quiz App
      </h1>

      {!user ? (
        <>
          <p className="max-w-xl text-center text-[var(--text-color)]/80 mb-12 text-lg animate-fadeInUp">
            Master any subject with interactive flashcards and quizzes.
            <br />
            <strong>Login or register</strong> to start tracking your progress!
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-[var(--button-bg)] shadow-button-neumorphism
                         hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold text-xl
                         transition w-64 text-center animate-bounce"
            >
              <FaSignInAlt size={24} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-[var(--button-bg)] shadow-button-neumorphism
                         hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold text-xl
                         transition w-64 text-center animate-bounce animation-delay-200"
            >
              <FaUserCircle size={24} />
              Register
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="max-w-xl text-center text-[var(--text-color)]/90 mb-12 text-lg animate-fadeInUp">
            Welcome, <span className="font-semibold">{user.name}</span>! Ready
            to boost your knowledge today?
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-[var(--button-bg)] shadow-button-neumorphism
                         hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold text-xl
                         transition w-64 text-center animate-pulse animation-delay-200"
            >
              <FaBookOpen size={28} />
              Flashcard Decks
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
