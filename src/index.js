// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const {v4} = require('uuid');
const { text } = require('express');

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

const schema = gql`
    type Query{
        me: User
        user(id: ID!): User
        users:[User!]

        messages: [Message!]!
        message(id:ID!): Message!
    }

    type Mutation{
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
        updateMessage(id: ID!, text: String!): Boolean!
    }

    type User{
        id: ID!
        username: String!
        messages: [Message!]
    }

    type Message{
        id: ID!
        text: String!
        user: User!
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
        },
        messages: () => {
            return Object.values(messages);
        },
        message: (parent, {id}) =>  {
            return messages[id];
        }
    },

    Mutation:{
        createMessage: (parent, {text}, {me}) => {
            const id = v4();
            const message = {
                id,
                text,
                userId: me.id
            };

            messages[id] = message;
            users[me.id].messageIds.push(id);

            return message;
        },
        deleteMessage: (parent, {id}) => {
            const { [id]: message, ...otherMessages} = messages;

            if(!message){
                return false;
            }

            console.log(otherMessages);
            //Input: mutation{deleteMessage(id:"1")} Output: { '2': { id: '2', text: 'By World', userId: '2' } }
            messages = otherMessages;

            return true;
        },
        updateMessage: (parent, {id, text}) => {
            const {[id]:message, ...otherMessages} = messages;
            console.log(message);
            if(!message){
                return false;
            }
            
            message.text = text;

            return true;

        }
    },

    Message:{
        user: message => {
            return users[message.userId];
        }
    },

    User:{
        messages: user => {
            return Object.values(messages).filter(message => message.userId === user.id);
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