import { useState } from "react";

function AddNoteForm(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  // Handle form submission
  function handleSubmit() {
    if (note.title && note.content) {
      props.addNote({ 
        ...note,
         id: Math.random().toString() 
        }); // Call addNote passed via props

      setNote({ title: "", content: "" }); // Reset form
    } else {
      alert("Please fill in both fields before adding a note.");
    }
  }

  return (
    <div className="add-note-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        value={note.content}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>+</button>
    </div>
  );
}

export default AddNoteForm;
