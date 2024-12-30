function Note({ id, title, content, onDelete }) {
    return (
      <div className="note">
        <h3>{title}</h3>
        <p>{content}</p>
        <button onClick={() => onDelete(id)}>Delete</button>

      </div>
    );
  }
  
  export default Note;
  