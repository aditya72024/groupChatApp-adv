const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Users = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // ispremiumuser: Sequelize.BOOLEAN,
    // totalExpense: {
    //     type: Sequelize.DOUBLE,
    //     defaultValue: '0',
        
    // },
});


module.exports = Users;