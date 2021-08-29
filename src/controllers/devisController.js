const pool = require("../../db");
const Joi = require('joi');

const schema = Joi.object({
    year: Joi.number()
        .integer()
        .required(),

    number: Joi.number()
        .integer()
        .greater(0)
        .required(),

    comment: Joi.string()
        .trim()
});

// READ All
const addDevis = async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);

        const today = new Date();
        console.log(today);

        const newDevis = await pool.query(
            "INSERT INTO devis (year, number, created_at)" +
            "VALUES($1, $2, $3)",
            //+ "RETURNING *",
            [req.body.year, req.body.number, today]
        );

        res.json(value);

    } catch (err) {
        console.error("Err : " + err.message);
        if (process.env.NODE_ENV === "development") // not in prod ? :/
            next(err);
    }
};


// READ One

const getDevis = async (req, res, next) => {
    try {
        const year = req.params.year;
        const number = req.params.number;

        const value = await schema.validateAsync(req.body);

        const queryRes = await pool.query(
            "SELECT * FROM devis WHERE year = $1 AND number = $2",
            [year, number]);

        if (!queryRes) next();

        console.log(queryRes);
        res.json(queryRes);

    } catch (err) {
        console.error("Err : " + err.message);
        if (process.env.NODE_ENV === "development") // not in prod ? :/
            next(err);
    }
}

// UPDATE One

const putDevis = async (req, res, next) => {
    try {
        const year = req.params.year;
        const number = req.params.number;
        const comment = req.body.comment;
        const value = await schema.validateAsync(req.body);

        const devisExists = await pool.query(
            "SELECT * FROM devis WHERE year = $1 AND number = $2",
            [year, number]);

        if (!devisExists) next();

        const queryRes = await pool.query(
            "UPDATE devis SET comment = $1" +
            "WHERE year = $2 and number = $3",
            [comment, year, number]);

        res.json(value);

    } catch (err) {
        console.error("Err : " + err.message);
        if (process.env.NODE_ENV === "development") // not in prod ? :/
            next(err);
    }
}


// DELETE One

const deleteDevis = async (req, res, next) => {
    try {
        const year = req.params.year;
        const number = req.params.number;

        const queryRes = pool.query(
            "DELETE FROM devis" +
            " WHERE year = $1 and number = $2",
            [year, number]
        );

        res.json({
            "message": "Success"
        });

    } catch (err) {
        console.log("Err : " + err);
        if (process.env.NODE_ENV === "development") // not in prod ? :/
            next(err);
    }
}


module.exports = {
    addDevis,
    getDevis,
    putDevis,
    deleteDevis
}
