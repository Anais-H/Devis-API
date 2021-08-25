const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.listen(5000,
    () => console.log("Server has started on port 5000")
);

//routes

app.post("/devis", async(req, res) => {
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
