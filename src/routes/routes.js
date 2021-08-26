const express = require("express");

const router = express.Router();

// devis table

router.post("/devis", async(req, res) => {
    try {
        const newDevis = await pool.query(
            "INSERT INTO devis (year, number, created_at)" +
            "VALUES($1, $2, $3)" +
            "RETURNING *",
            [req.body.year, req.body.number, req.body.created_at]
        );

        res.json(newDevis.rows);

    } catch (err) {
        console.error("Err : " + err.message);
    }
});
