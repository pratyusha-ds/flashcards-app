import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="absolute top-6 right-6 flex items-center gap-3 bg-[var(--button-bg)] rounded-2xl px-4 py-2 shadow-button-neumorphism select-none">
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          onClick={() => navigate("/profile")}
          className="w-7 h-7 rounded-full object-cover cursor-pointer shadow-md"
          aria-label="Go to Profile"
        />
      ) : (
        <FaUserCircle
          size={28}
          className="text-[var(--text-color)]"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          aria-label="Go to Profile"
        />
      )}
      <span className="font-semibold text-[var(--text-color)]">
        {user?.name}
      </span>
      <button
        onClick={logout}
        className="ml-4 px-3 py-1 rounded-xl shadow-logout-button text-[var(--text-color)] font-semibold transition cursor-pointer"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
