import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
const Client = pg.Client;
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection Function
async function getClient() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  return client;
}

// POST: Add a Note
app.post("/add", async (req, res) => {
  const note = req.body;
  const client = await getClient();

  const addNoteQuery = "INSERT INTO todolist (id, title, content) VALUES ($1, $2, $3)";
  const values = [note.id, note.title, note.content];

  try {
    await client.query(addNoteQuery, values);
    res.json({ message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Error adding note" });
  }
});

// GET: Retrieve All Notes
app.get("/notes", async (req, res) => {
  const client = await getClient();
  const selectQuery = "SELECT * FROM todolist";

  try {
    const response = await client.query(selectQuery);
    res.json(response.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// DELETE: Delete a Note by ID
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const client = await getClient();

  const deleteQuery = "DELETE FROM todolist WHERE id = $1";
  const values = [id];

  try {
    const result = await client.query(deleteQuery, values);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.json({ message: `Note with id ${id} deleted successfully` });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
