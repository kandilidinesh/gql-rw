const models = require('../models/index.js');
const { Connection } = require('pg');

const userResolvers = {
    Query: {
        me: (parent, args, {me, pool}) => {
            return me;
        },
        user: async (parent, {id}, {pool, users}) =>{
            // return users[id];
            const res = await pool.query("SELECT * FROM usr WHERE user_id = $1", [id]);
            res.rows.map(data => {
                user ={
                    id: data.user_id,
                    username: data.uname
                }
            });
            return user;
        },
        users:async (parent, args, {pool,users}) => {
            // return Object.values(users);
            const res = await pool.query("SELECT * FROM usr");
            // return Object.entries(res.rows);
            let usersDetails=[]
            let  resObj = {};
            // let msgs =[]
            // let msg={}

            res.rows.map(data => {
                // resObj ={
                //     id: data.user_id,
                //     username: data.uname
                // }
                resObj ={
                    id:data.user_id,
                    username:data.uname
                }

                // resObj.id=data.user_id
                // resObj.username=data.uname
                usersDetails.push(resObj)
                // msg={
                //     id:data.data.msg_id,
                //     message:data.message
                // }
            });
            return usersDetails;

        }
    }
};

module.exports = userResolvers;