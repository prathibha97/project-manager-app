require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const connectDB = require('./config/db')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`server listening on port ${port}`)
  connectDB()
})