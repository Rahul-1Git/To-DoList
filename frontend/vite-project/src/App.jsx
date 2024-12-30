import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch Notes from Backend
  async function getNotes() {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Add a Note
  async function addNote(note) {
    try {
      await axios.post("http://localhost:3000/add", note);
      getNotes(); // Refresh notes after adding
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // Delete a Note
  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      getNotes(); // Refresh notes after deleting
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1> To-Do List</h1>
      </header>
  
      <AddNoteForm addNote={addNote} />
  
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default App;
