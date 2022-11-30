const { GraphQLSchema } = require("graphql");
const mutation = require("./mutations");
const RootQuery = require("./resolvers");


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})