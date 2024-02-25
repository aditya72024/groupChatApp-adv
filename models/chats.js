const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Chats = sequelize.define('chats',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    // ispremiumuser: Sequelize.BOOLEAN,
    // totalExpense: {
    //     type: Sequelize.DOUBLE,
    //     defaultValue: '0',
        
    // },
});


module.exports = Chats;