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
const Groups = require('./models/groups');
const UserGroups = require('./models/usergroups');
const GroupAdmins = require('./models/groupadmins');
const GroupInvitations = require('./models/groupinvitations');

const usersRoutes = require('./routes/users');
app.use('/user', usersRoutes);

const chatsRoutes = require('./routes/chats');
app.use('/chat', chatsRoutes);

const groupRoutes = require('./routes/groups');
app.use('/group', groupRoutes);


Chats.belongsTo(Users, {constraints: true, onDelete: 'CASCADE'})
Chats.belongsTo(Groups, {constraints: true, onDelete: 'CASCADE'})
Users.hasMany(Chats)
Groups.hasMany(Chats)

GroupAdmins.belongsTo(Users, {constraints: true, onDelete: 'CASCADE'})

GroupAdmins.belongsTo(Groups, {constraints: true, onDelete: 'CASCADE'})

Users.hasMany(GroupAdmins)
Groups.hasMany(GroupAdmins)


Users.belongsToMany(Groups, {through: UserGroups})
Groups.belongsToMany(Users, {through: UserGroups})

GroupInvitations.belongsTo(Groups, {constraints: true, onDelete: 'CASCADE'})
GroupInvitations.belongsTo(Users, {constraints: true, onDelete: 'CASCADE'})
Users.hasMany(GroupInvitations)
Groups.hasMany(GroupInvitations)







sequelize.sync().then(result=>{
    app.listen(5100);
}).catch(err=>{
    console.log(err)
})



