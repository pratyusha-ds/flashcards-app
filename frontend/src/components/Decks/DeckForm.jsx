import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function DeckForm({ onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4 mb-12"
      aria-label="Add new deck form"
    >
      <input
        type="text"
        placeholder="New deck title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow p-4 rounded-xl bg-[var(--input-bg)] shadow-deep-inset text-[var(--text-color)] placeholder:text-[var(--placeholder-color)] focus:outline-none focus:shadow-button-neumorphism transition"
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
