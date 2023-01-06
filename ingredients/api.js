const path = require("path");
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
// client side static assets
router.get("/", (_, res) => res.sendFile(path.join(__dirname, "./index.html")));
router.get("/client.js", (_, res) =>
  res.sendFile(path.join(__dirname, "./client.js"))
);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// connect to postgres

router.get("/type", async (req, res) => {
  const { type } = req.query;
  console.log("get ingredients", type);

  const { rows } = await pool.query(`SELECT * FROM ingredients WHERE type=$1`, [
    type,
  ]);

  res.status(200).json({ rows }).end();
});

router.get("/search", async (req, res) => {
  let { term, page } = req.query;
  page = page ? page : 0;
  console.log("search ingredients", term, page);
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ingredients WHERE CONCAT(title, type) ILIKE $1 OFFSET $2 LIMIT 5`,
      [`%${term}%`, page * 5]
    );
    res.status(200).json({ rows }).end();
  } catch (ex) {
    res.status(400).json({ message: ex.message }).end();
  }
  // return all columns as well as the count of all rows as total_count
  // make sure to account for pagination and only return 5 rows at a time
});

/**
 * Student code ends here
 */

module.exports = router;
