const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving accounts" })
    );
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Account with that ID not found" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving account" })
    );
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(err => res.status(500).json({ message: "Error creating account" }));
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error editing information" })
    );
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Record deleted successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error deleting account" }));
});

module.exports = router;