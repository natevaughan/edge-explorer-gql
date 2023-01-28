
export const resolvers = {
  Query: {
    popularDestinations: (_, __, { dataSources }) => {
      return dataSources.nodeEdgeAPI.getDestinations();
    },
    destination: (_, args, { dataSources }) => {
      return dataSources.nodeEdgeAPI.getDestination(args.id);
    }
  },
  Destination: {
    edges: (parent, args, { dataSources }) => {
      return parent.edges.map(it => dataSources.nodeEdgeAPI.getEdge(it.id));
    }
  },
  Edge: {
    nodes: (parent, args, { dataSources }) => {
      return parent.nodes.map(it => dataSources.nodeEdgeAPI.getDestination(it.id));
    }
  }
};
