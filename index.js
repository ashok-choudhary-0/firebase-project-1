const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config();
const authRoutes = require("./routes/authRoutes")
const port = process.env.port || 5000;

const app = express();
app.use(bodyParser.json())
app.use("/auth", authRoutes)

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`)
})
