import express from "express";
import axios from "axios";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const PORT = 5000;

const OMDB_API_KEY = "442d118f";

app.use(cors());
app.use(express.json());

const db = new Database("database.db");

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_input TEXT,
    recommended_movies TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/recommend", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) return res.status(400).json({ recommendations: [] });

    const searchResponse = await axios.get(
      `http://www.omdbapi.com/?s=${keyword}&apikey=${OMDB_API_KEY}`
    );

    if (searchResponse.data.Response === "False") {
      return res.json({ recommendations: [] });
    }

    const movies = searchResponse.data.Search.slice(0, 5);
    const results = [];

    for (const movie of movies) {
      const detailResponse = await axios.get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${OMDB_API_KEY}`
      );

      results.push({
        title: detailResponse.data.Title,
        year: detailResponse.data.Year,
        genre: detailResponse.data.Genre,
        rating: detailResponse.data.imdbRating,
        poster: detailResponse.data.Poster,
        plot: detailResponse.data.Plot
      });
    }

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO recommendations (user_input, recommended_movies)
      VALUES (?, ?)
    `);
    stmt.run(keyword, JSON.stringify(results));

    res.json({ recommendations: results });
  } catch (error) {
    res.status(500).json({ recommendations: [] });
  }
});

app.get("/history", (req, res) => {
  const rows = db.prepare("SELECT * FROM recommendations ORDER BY timestamp DESC").all();
  res.json(rows);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
