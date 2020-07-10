const { gql } = require("apollo-server-express");

const messageDefs = gql`
    extend type Query{
        messages: [Message!]!
        message(id:ID!): Message!
    }

    type UsrObj{
        id: ID!
        username: String!
    }
    type Message{
        id: ID!
        text: String!
        user: UsrObj
    }

   extend type Mutation{
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
        updateMessage(id: ID!, text: String!): Boolean!
    }
`;

module.exports = messageDefs;