import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

function ToDoList({ todos, onDelete, onUpdate }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSaveClick = () => {
    onUpdate(editingTodo, editTitle, editDescription);
    setEditingTodo(null);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingTodo === todo.id ? (
            <>
              <div className="note-edit">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onInput={(e) => {
                    e.target.style.height = "auto"; // Resetuj wysokość
                    e.target.style.height = `${e.target.scrollHeight}px`; // Ustaw wysokość na podstawie zawartości
                    setEditDescription(e.target.value); // Aktualizuj stan
                  }}
                />
                <div className="buttons">
                  <button onClick={handleSaveClick}>Save</button>
                  <button
                    className="cancel"
                    onClick={() => setEditingTodo(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="note">
                <h1>{todo.title}</h1> <br />
                <p>{todo.description}</p>
                <div className="buttons">
                  <button className="delete" onClick={() => onDelete(todo.id)}>
                    <MdDelete size={20} />
                  </button>
                  <button onClick={() => handleEditClick(todo)}>
                    <MdEdit size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
