const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const GroupAdmins = sequelize.define('groupadmins',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

});


module.exports = GroupAdmins;