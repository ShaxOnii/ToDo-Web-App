import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function ToDoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAddTodo({ title, description });
    setTitle(""); // Reset formularza
    setDescription("");
  };

  return (
    <form className="create-note" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="auto-resize"
        type="text"
        name="description"
        placeholder="Take a note..."
        required
        value={description}
        onInput={(e) => {
          e.target.style.height = "auto"; // Resetuj wysokość
          e.target.style.height = `${e.target.scrollHeight}px`; // Ustaw wysokość na podstawie zawartości
          setDescription(e.target.value); // Aktualizuj stan
        }}
      />
      <button type="submit">
        <FaPlus className="plus" size={20} />
      </button>
    </form>
  );
}

export default ToDoForm;
