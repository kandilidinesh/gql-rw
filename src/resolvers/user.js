const models = require('../models/index.js');

const userResolvers = {
    Query: {
        me: (parent, args, {me, pool}) => {return me;},
        user: async (parent, {id}, {users}) =>{
            return users[id];
            // return await pool.query("SELECT * FROM todo");
        },
        users:(parent, args, {users}) => {
            return Object.values(users);
        },
        messages: (parent, args, {messages}) => {
            return Object.values(messages);
        },
        message: (parent, {id}, {messages}) =>  {
            return messages[id];
        }
    },
    User:{
        messages: (user, args, {messages}) => {
            return Object.values(messages).filter(message => message.userId === user.id);
        }
    }
};

module.exports = userResolvers;