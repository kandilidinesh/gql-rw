const messageResolvers = {
    Query: {
        messages: (parent, args, {messages, users}) => {
            return Object.values(messages);
        },
        message: (parent, {id}) =>  {
            return messages[id];
        }
    },
    Mutation:{
        createMessage: (parent, {text}, {me, pool, users, messages, v4}) => {
            const id = v4();
            const message = {
                id,
                text,
                userId: me.id
            };

            messages[id] = message;
            users[me.id].messageIds.push(id);

            return message;
            // return pool.query("INSERT INTO usrs (usr_id, message) VALUES ($1) RETURNING *", [message]);
        },
        deleteMessage: (parent, {id}, {pool,  users, messages}) => {
            const { [id]: message, ...otherMessages} = messages;

            if(!message){
                return false;
            }

            console.log(otherMessages);
            //Input: mutation{deleteMessage(id:"1")} Output: { '2': { id: '2', text: 'By World', userId: '2' } }
            messages = otherMessages;

            return true;
        },
        updateMessage: (parent, {id, text,  users, messages}) => {
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
        user: (message, args, {users, messages}) => {
            return users[message.userId];
        }
    },
};

module.exports = messageResolvers;