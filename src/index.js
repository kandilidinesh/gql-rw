// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

const app = express();

let users = {
    1: {
        id: '1',
        username: 'Dinesh'
    },
    2:{
        id:'2',
        username: 'Magesh'
    }
};

// const me = users[2];

const schema = gql`
    type Query{
        me: User
        user(id: ID!): User
        users:[User!]
    }

    type User{
        id: ID!
        username: String!
    }
`;

//In JavaScript, the resolvers are grouped in a JavaScript object, often called a resolver map.
const resolvers = {
    Query: {
        me: (parent, args, {me}) => {return me;},
        user: (parent, {id}) =>{
            return users[id];
        },
        users:() => {
            return Object.values(users);
        }
    }
};

const server = new ApolloServer({typeDefs:schema, resolvers, context:{
    me: users[1]
}});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({port: 8000}, () => {
    console.log(`Apollo Server is running on port http://localhost:8000/graphql`);
});
