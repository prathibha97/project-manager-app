const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLID } = require("graphql")
const { clients, projects } = require("../sampleData")
const { ProjectType, ClientType } = require("./types")
const Project = require("../models/Project")
const Client = require("../models/Client")

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find()
      }
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Project.findById(args.id)
      }
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find()
      }
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Client.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})