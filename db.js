const Pool = require("pg").Pool;

const config = require("./config/config.json")[process.env.NODE_ENV];

const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: config.database
});

module.exports = pool;
