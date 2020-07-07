// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const {v4} = require('uuid');
const { text } = require('express');

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const app = express();

let users = {
    1: {
        id: '1',
        username: 'Dinesh',
        messageIds: [1]
    },
    2:{
        id:'2',
        username: 'Magesh',
        messageIds: [2]
    }
};

let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1'
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2'
    },
};
// const me = users[2];



//In JavaScript, the resolvers are grouped in a JavaScript object, often called a resolver map.


const server = new ApolloServer(
    {
        typeDefs, 
        resolvers,
         
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({port: 8000}, () => {
    console.log(`Apollo Server is running on port http://localhost:8000/graphql`);
});