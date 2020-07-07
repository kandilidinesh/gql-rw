const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const data = require('./data');
const messages = data.messages;
const users = data.users;
const app = express();

const server = new ApolloServer({typeDefs, resolvers, context: {me: users[1]}});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({port: 8000}, () => {
    console.log(`Apollo Server is running on port http://localhost:8000/graphql`);
});