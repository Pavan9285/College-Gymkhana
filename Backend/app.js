const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection=require("./connection");
const registerRoutes = require("./routes/user-route");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", registerRoutes);

app.listen(port, () => {
    console.log(`Server started on Port ${port}...`);
});