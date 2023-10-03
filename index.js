const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config();
const userRoutes = require("./routes/userRoutes")
const port = process.env.port || 5000;
const app = express();
app.use(bodyParser.json())
app.use("/user", userRoutes);

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`)
})
