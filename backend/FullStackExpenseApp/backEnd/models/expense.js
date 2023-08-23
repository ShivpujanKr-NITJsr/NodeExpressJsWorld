const Sequelize = require('sequelize');

const sequelize = require('../connect')


const expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Disable the automatic createdAt and updatedAt columns
}
)

module.exports=expense