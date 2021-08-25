const Pool = require("pg").Pool;

const pool = new Pool({
    user: "pgadmin",
    password: "pgadmin",
    host: "localhost",
    port: 5432,
    database: "devis"
});

module.exports = pool;
