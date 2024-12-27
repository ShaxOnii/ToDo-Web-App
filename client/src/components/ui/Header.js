import React, { useState } from "react";
import { CiStickyNote } from "react-icons/ci";
import { FaCog } from "react-icons/fa";

function Header({ onLogout, isLoggedIn, handleDeleteUser, userId }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <h1>
        <CiStickyNote size={50} />
        ToDo App !
      </h1>
      {isLoggedIn && (
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            <FaCog size={24} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
              >
                Logout
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  alert("User settings");
                }}
              >
                User Settings
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleDeleteUser(userId);
                }}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
