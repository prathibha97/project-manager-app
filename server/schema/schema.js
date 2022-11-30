const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLID } = require("graphql");
const { clients, projects } = require("../sampleData");
const { ProjectType, ClientType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return projects
      }
    },

    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(_, args) {
        return projects.find(project => project.id === args.id)
      }
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return clients
      }
    },

    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(_, args) {
        return clients.find(client => client.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})