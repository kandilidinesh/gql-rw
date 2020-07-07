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

module.exports = resolvers;