const mongoose = require("mongoose")

const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", true)
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected on host ${db.connection.host}`.cyan)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectToDatabase
