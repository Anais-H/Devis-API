const express = require("express");

const queries = require("../controllers/devisController");

const router = express.Router();

// devis table

router.post("/devis/add", queries.addDevis);

router.get("/devis/get/:year/:number", queries.getDevis);

router.put("/devis/update/:year/:number", queries.putDevis);

router.delete("/devis/delete/:year/:number", queries.deleteDevis);


module.exports = router;
