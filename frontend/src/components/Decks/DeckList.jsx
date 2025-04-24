import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { FaTrashAlt, FaPlayCircle } from "react-icons/fa";
import DeckForm from "./DeckForm";
import Navbar from "../Navbar";

export default function DeckList() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const fetchDecks = async () => {
    try {
      const res = await api.get("/decks");
      setDecks(res.data);
    } catch (error) {
      console.error("Failed to fetch decks", error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleAddDeck = async (title) => {
    try {
      await api.post("/decks", { title });
      fetchDecks();
    } catch (error) {
      console.error("Failed to create deck", error);
    }
  };

  const deleteDeck = async (id) => {
    try {
      await api.delete(`/decks/${id}`);
      fetchDecks();
    } catch (error) {
      console.error("Failed to delete deck", error);
    }
  };

  return (
    <div className="min-h-screen min-w-[320px] pt-30 bg-[var(--bg-color)] p-8 font-cute relative">
      <Navbar />

      <h2 className="text-4xl font-bold text-[var(--text-color)] mb-8 text-center">
        Your Decks
      </h2>

      <DeckForm onSubmit={handleAddDeck} />

      <ul className="max-w-xl mx-auto space-y-6">
        {decks.length === 0 && (
          <p className="text-center text-[var(--placeholder-color)] italic">
            You have no decks yet. Create one above!
          </p>
        )}
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="flex justify-between items-center bg-[var(--form-bg)] p-5 rounded-2xl shadow-form-neumorphism"
          >
            <Link
              to={`/decks/${deck.id}/cards`}
              className="text-xl font-semibold text-[var(--text-color)] hover:underline flex-grow"
            >
              {deck.title}
            </Link>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/decks/${deck.id}/quiz`)}
                className="p-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] transition"
                aria-label={`Start quiz for ${deck.title}`}
              >
                <FaPlayCircle size={20} />
              </button>
              <button
                onClick={() => deleteDeck(deck.id)}
                className="p-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-red-500 transition"
                aria-label={`Delete deck ${deck.title}`}
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
