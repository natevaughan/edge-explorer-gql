import { gql } from "apollo-server-micro";

export  const typeDefs = gql`

"Entry points"
type Query {
  "Retrieve destinations for the home view"
  popularDestinations: [Destination!]!
  "Fetch a specific destination by ID"
  destination(id: ID!): Destination!
}

type Destination {
    id: ID!
    name: String
    country: String
    edges: [Edge]
}

type Edge {
    id: ID
    strength: Int
    nodes: [Destination]
}

`
