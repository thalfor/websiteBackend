//
const express = require("express");
const routes = require("./routes");
const database = require("./database");
//
const app = express();
app.use(express.json());
app.use(routes);
database();
//
const PORT = 3000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
//