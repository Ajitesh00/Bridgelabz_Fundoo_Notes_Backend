// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Note extends Model {
//     static associate(models) {
//       Note.belongsTo(models.user, {
//         foreignKey: 'createdBy',
//         as: 'author',
//         onDelete: 'CASCADE'
//       });
//     }
//   }

//   Note.init(
//     {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       description: {
//         type: DataTypes.STRING
//       },
//       createdBy: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       }
//     },
//     {
//       sequelize,
//       modelName: 'Note',
//       tableName: 'notes',
//       timestamps: true
//     }
//   );

//   return Note;
// };

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
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      createdBy: DataTypes.INTEGER
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
