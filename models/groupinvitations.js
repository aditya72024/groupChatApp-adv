const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const GroupInvitations = sequelize.define('groupinvitations',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

});


module.exports = GroupInvitations;