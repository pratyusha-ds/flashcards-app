import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export default function Quiz() {
  const { deckId } = useParams();
  const { user, logout } = useContext(AuthContext);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);

  const fetchDueCards = async () => {
    setLoading(true);
    setQuizComplete(false);
    try {
      const res = await api.get(`/decks/${deckId}/quiz`);
      setCards(res.data);
      setCurrentIndex(0);
      setShowAnswer(false);
    } catch (error) {
      console.error("Failed to fetch quiz cards", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDueCards();
  }, [deckId]);

  const submitAnswer = async (correct) => {
    const card = cards[currentIndex];
    try {
      await api.post(`/cards/${card.id}/answer`, { correct });
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setQuizComplete(true);
      }
    } catch (error) {
      console.error("Failed to submit answer", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--placeholder-color)] font-cute">
        Loading quiz...
      </div>
    );

  if (cards.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg-color)] font-cute text-[var(--placeholder-color)]">
        <p className="text-2xl mb-4">No cards due for review!</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold transition"
        >
          Go Back
        </button>
      </div>
    );

  if (quizComplete)
    return (
      <div className="min-h-screen bg-[var(--bg-color)] p-8 font-cute relative flex flex-col items-center justify-center">
        <div className="absolute top-6 right-6 flex items-center gap-3 bg-[var(--button-bg)] rounded-2xl px-4 py-2 shadow-button-neumorphism cursor-pointer select-none">
          <span className="font-semibold text-[var(--text-color)]">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="ml-4 px-3 py-1 rounded-xl bg-[var(--input-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover transition text-[var(--text-color)] font-semibold"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>

        <div className="max-w-md bg-[var(--form-bg)] p-8 rounded-3xl shadow-form-neumorphism text-center text-[var(--text-color)]">
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-8 py-4 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  const card = cards[currentIndex];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] p-8 font-cute relative flex flex-col items-center">
      <div className="absolute top-6 right-6 flex items-center gap-3 bg-[var(--button-bg)] rounded-2xl px-4 py-2 shadow-button-neumorphism cursor-pointer select-none">
        <span className="font-semibold text-[var(--text-color)]">
          {user?.email}
        </span>
        <button
          onClick={logout}
          className="ml-4 px-3 py-1 rounded-xl bg-[var(--input-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover transition text-[var(--text-color)] font-semibold"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      <h2 className="text-4xl font-bold text-[var(--text-color)] mb-6">
        Quiz: Deck {deckId}
      </h2>
      <p className="mb-6 text-[var(--placeholder-color)] font-semibold">
        Card {currentIndex + 1} of {cards.length}
      </p>

      <div className="w-full max-w-xl bg-[var(--form-bg)] p-8 rounded-3xl shadow-form-neumorphism text-[var(--text-color)]">
        <div className="mb-8 text-2xl font-semibold">
          <span className="text-[var(--placeholder-color)]">Q:</span>
          {card.question}
        </div>

        {showAnswer ? (
          <>
            <div className="mb-8 text-2xl font-semibold">
              <span className="text-[var(--placeholder-color)]">A:</span>
              {card.answer}
            </div>
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => submitAnswer(true)}
                className="px-8 py-3 rounded-xl bg-green-400 shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-white font-semibold transition"
                aria-label="Mark answer correct"
              >
                I got it right
              </button>
              <button
                onClick={() => submitAnswer(false)}
                className="px-8 py-3 rounded-xl bg-red-400 shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-white font-semibold transition"
                aria-label="Mark answer incorrect"
              >
                I got it wrong
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-10 py-4 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold transition"
            aria-label="Show answer"
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
}
