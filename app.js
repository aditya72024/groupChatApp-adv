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

const usersRoutes = require('./routes/users');
app.use('/user', usersRoutes);

sequelize.sync().then(result=>{
    app.listen(5100);
}).catch(err=>{
    console.log(err)
})


