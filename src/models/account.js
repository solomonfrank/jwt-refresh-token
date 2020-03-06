import uuid from "uuid/v4";

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuid()
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      changedPassword: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Account.associate = () => {
    // associations can be defined here
  };
  return Account;
};
