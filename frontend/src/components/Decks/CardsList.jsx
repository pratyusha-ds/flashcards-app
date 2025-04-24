import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import CardForm from "./CardForm";
import { FaTrashAlt } from "react-icons/fa";

export default function CardsList() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");

  const fetchCards = async () => {
    try {
      const res = await api.get(`/decks/${deckId}/cards`);
      setCards(res.data);
    } catch (error) {
      console.error("Failed to fetch cards", error);
    }
  };

  const fetchDeckTitle = async () => {
    try {
      const res = await api.get("/decks");
      const deck = res.data.find((d) => d.id.toString() === deckId);
      setDeckTitle(deck ? deck.title : "Unknown Deck");
    } catch (error) {
      console.error("Failed to fetch deck title", error);
      setDeckTitle("Unknown Deck");
    }
  };

  useEffect(() => {
    fetchCards();
    fetchDeckTitle();
  }, [deckId]);

  const handleAddCard = async ({ question, answer }) => {
    try {
      await api.post(`/decks/${deckId}/cards`, { question, answer });
      fetchCards();
    } catch (error) {
      console.error("Failed to create card", error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await api.delete(`/cards/${id}`);
      fetchCards();
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] p-8 font-cute flex justify-center">
      <div className="max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-[var(--text-color)] mb-10 text-center">
          Cards in Deck <span className="italic">{deckTitle || deckId}</span>
        </h2>

        <CardForm onSubmit={handleAddCard} />

        <ul className="space-y-6">
          {cards.length === 0 && (
            <p className="text-center italic text-[var(--placeholder-color)]">
              No cards in this deck yet. Add some above!
            </p>
          )}
          {cards.map((card) => (
            <li
              key={card.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[var(--form-bg)] p-5 rounded-2xl shadow-form-neumorphism"
            >
              <div className="mb-3 sm:mb-0 flex-1">
                <p className="font-semibold text-[var(--text-color)]">
                  Q: <span className="font-normal">{card.question}</span>
                </p>
                <p className="mt-1 text-[var(--placeholder-color)]">
                  A: <span className="font-normal">{card.answer}</span>
                </p>
              </div>
              <button
                onClick={() => deleteCard(card.id)}
                className="p-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-red-500 transition self-start sm:self-auto"
                aria-label={`Delete card with question ${card.question}`}
              >
                <FaTrashAlt size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
