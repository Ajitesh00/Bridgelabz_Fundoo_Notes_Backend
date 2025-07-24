'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'user'
      });
    }
  }

  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'default',
        allowNull: false
      },
      isPinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isTrash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      hasReminder: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      reminderDateTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      hasCollaborator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      collaboratorEmail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      labels: {
        type: DataTypes.JSON,
        allowNull: true
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Note',
      tableName: 'notes',
      timestamps: true
    }
  );

  return Note;
};