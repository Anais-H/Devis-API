const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./src/routes/routes");

const app = express();

//middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false})); // parsing JSON and urlencoded data and populating body.req
app.use(express.json()); //req.body

app.use("/api/v1", routes);


app.listen(5000,
    () => console.log("Server has started on port 5000")
);
