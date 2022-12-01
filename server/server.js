require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const schema = require('./schema/schema')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`server listening on port ${port}`)
  connectDB()
})