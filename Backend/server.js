const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "blunivers",
  password: "3922",
  database: "duolit",
});

app.use(express.json()); // Add this to parse JSON bodies

app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.get("/users", (req, res) => {
  const sql = "SELECT id, name FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/login", (req, res) => {
  const sql = "SELECT * FROM user where name = ? AND password = ?";
  db.query(
    sql,
    [req.query.user_name, req.query.user_password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      return res.json(results);
    }
  );
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const { name, password } = req.body;
  const sql = "INSERT INTO user (name, password) VALUES (?, ?)";
  db.query(sql, [name, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "User created", userId: result.insertId });
  });
});
app.post("/authors", (req, res) => {
  const { name } = req.body;
  var sql = "INSERT INTO author (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "Author created", bookId: result.insertId });
  });
});
app.get("/user_has_books", (req, res) => {
  const sql =
    "SELECT * FROM user_has_book LEFT JOIN book ON user_has_book.book_id = book.id WHERE user_id = ?";
  db.query(sql, [req.query.user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    return res.json(results);
  });
});

app.post("/books", (req, res) => {
  const { name, author, genre } = req.body;
  var sql = "INSERT INTO book (name, author_name, genre_name) VALUES (?, ?, ?)";
  db.query(sql, [name, author, genre], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "Book created", bookId: result.insertId });
  });
});

app.post("/user_has_books", (req, res) => {
  const { user_id, book_name, author_name } = req.body;
  var sql =
    "INSERT INTO user_has_book (user_id, book_id) SELECT ?, id FROM book WHERE name = ? AND author_name = ?";
  db.query(sql, [user_id, book_name, author_name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "User has book created", bookId: result.insertId });
  });
});
app.listen(8081, () => {
  console.log("Listening");
});

// npm start
