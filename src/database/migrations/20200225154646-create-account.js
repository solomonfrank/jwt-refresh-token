import uuid from "uuid/v4";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Accounts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      firstName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      lastName: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      changedPassword: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }),
  down: queryInterface => queryInterface.dropTable("Accounts")
};
