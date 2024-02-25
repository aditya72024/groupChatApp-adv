const express = require('express');

const sequelize = require('./util/database');

app = express();

const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const Users = require('./models/users');
const Chats = require('./models/chats');

const usersRoutes = require('./routes/users');
app.use('/user', usersRoutes);

const chatsRoutes = require('./routes/chats');
app.use('/chat', chatsRoutes);


Chats.belongsTo(Users, {constraints: true, onDelete: 'CASCADE'});
Users.hasMany(Chats)

sequelize.sync().then(result=>{
    app.listen(5100);
}).catch(err=>{
    console.log(err)
})



