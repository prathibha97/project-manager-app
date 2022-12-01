const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLEnumType } = require("graphql");
const Client = require("../models/Client");
const Project = require("../models/Project");
const { ClientType, ProjectType } = require("./types");

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

    // add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          }),
          defaultValue: 'Not Started'
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        })
        return project.save()
      }
    },

    // delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },

    // update a project
    UpdateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          }),
        },
      },
      resolve(_, args) {
        return Project.findByIdAndUpdate(
          args.id, {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status
          },
        },
          { new: true }
        )
      }
    },
  }
})

module.exports = mutation