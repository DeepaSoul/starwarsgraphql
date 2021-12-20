import { gql, ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import axios from "axios";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  type People {
    count: Int,
    next: String,
    previous: String,
    results: [Person]
  }
  
  type Person {
    name: String,
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    homeworld: String,
    films: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
    created: String,
    edited: String,
    url: String
  }

  type Query {
    getPeople(page: String): People
    getPerson(name: String): People
  }
`;

const resolvers = {
  Query: {
    getPeople: async (_: any, args: any) => {
      try {
        const response = await axios.get("https://swapi.dev/api/people/?page=" + args.page);
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getPerson: async (_: any, args: any) => {
      try {
        const response = await axios.get("https://swapi.dev/api/people/?search=" + args.name);
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};