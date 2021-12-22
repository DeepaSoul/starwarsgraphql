
import { gql } from "@apollo/client";
import client from "../graphql/apolloClient";

export const getCharacters = async (page: number) => (await client.query({
    query: getCharactersQuery(page)
}))

export const getCharactersQuery = (page: number) => (gql`
    query{
        getPeople(page:"${page?.toString()}"){
            next
            previous
            results{
                name
                height
                mass
                gender
                homeworld
            }
        }
    }
`)

export const getChracterQuery = (name: String) => (gql`
    query{
        getPerson(name: "${name}"){
            results{
                name
                height
                birth_year
                films
            }
        }
    }
`)