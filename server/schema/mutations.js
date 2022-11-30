const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const Client = require("../models/Client");
const { ClientType } = require("./types");

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })
        return client.save()
      }
    },

    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args) {
        return Client.findByIdAndRemove(args.id)
      }
    },
  }
})

module.exports = mutation