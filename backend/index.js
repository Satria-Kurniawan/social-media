const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 5000
require("colors")
const connectToDatabase = require("./config/databaseConnection")
const { errorHandler } = require("./middleware/errorHandler")

connectToDatabase()

app.get("/", (req, res) => {
  res.send("Backend ready!")
})

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/accounts", require("./routes/accountRoutes"))
app.use("/api/posts", require("./routes/postRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`.blue))
