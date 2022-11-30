const mongoose = require('mongoose')

const connectDB = async()=>{
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to database`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB