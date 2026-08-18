const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("Blood Donor API is running");
});

// GET all donors
app.get("/api/donors", (req, res) => {
  const sql = "SELECT * FROM donors ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);
  });
});

// ADD donor
app.post("/api/donors", (req, res) => {
  const { name, blood_group, phone, area } = req.body;

  if (!name || !blood_group || !phone || !area) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO donors
    (name, blood_group, phone, area, donation_count, last_donation_date)
    VALUES (?, ?, ?, ?, 0, NULL)
  `;

  db.query(
    sql,
    [name, blood_group, phone, area],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Donor added successfully",
        id: result.insertId,
      });
    }
  );
});

// DONATE BLOOD
app.put("/api/donors/:id/donate", (req, res) => {
  const donorId = req.params.id;

  const checkSql = "SELECT * FROM donors WHERE id = ?";

  db.query(checkSql, [donorId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    const donor = results[0];

    // 120 days cooldown check
    if (donor.last_donation_date) {
      const lastDate = new Date(donor.last_donation_date);
      const today = new Date();

      const difference =
        Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (difference < 120) {
        return res.status(400).json({
          message: `Donor cannot donate yet. ${120 - difference} days remaining.`,
        });
      }
    }

    const updateSql = `
      UPDATE donors
      SET donation_count = donation_count + 1,
          last_donation_date = CURDATE()
      WHERE id = ?
    `;

    db.query(updateSql, [donorId], (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Donation recorded successfully",
      });
    });
  });
});

// DELETE donor
app.delete("/api/donors/:id", (req, res) => {
  const donorId = req.params.id;

  const sql = "DELETE FROM donors WHERE id = ?";

  db.query(sql, [donorId], (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      message: "Donor removed successfully",
    });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});