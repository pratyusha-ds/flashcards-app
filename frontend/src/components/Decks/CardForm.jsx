import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function CardForm({ onSubmit }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSubmit({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 mb-12"
      aria-label="Add new card form"
    >
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-1 p-4 rounded-xl bg-[var(--input-bg)] shadow-deep-inset placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] focus:outline-none focus:shadow-button-neumorphism transition"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="flex-1 p-4 rounded-xl bg-[var(--input-bg)] shadow-deep-inset placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] focus:outline-none focus:shadow-button-neumorphism transition"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold flex items-center justify-center gap-2 transition"
        aria-label="Add Deck"
      >
        <FaPlus /> Add
      </button>
    </form>
  );
}
