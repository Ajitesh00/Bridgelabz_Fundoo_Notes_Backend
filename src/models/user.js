// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init(
//     {
//       firstName: { type: DataTypes.STRING, allowNull: false },
//       lastName:  { type: DataTypes.STRING, allowNull: false },
//       email:     { type: DataTypes.STRING, allowNull: false },
//       password:  { type: DataTypes.STRING, allowNull: false }
//     },
//     {
//       sequelize,
//       modelName: 'user',
//     }
//   );
//   return user;
// };

// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     static associate(models) {
//       user.hasMany(models.Note, {
//         foreignKey: 'createdBy',
//         as: 'notes',
//         onDelete: 'CASCADE'
//       });
//     }
//   }

//   user.init(
//     {
//       firstName: { type: DataTypes.STRING, allowNull: false },
//       lastName: { type: DataTypes.STRING, allowNull: false },
//       email: { type: DataTypes.STRING, allowNull: false },
//       password: { type: DataTypes.STRING, allowNull: false }
//     },
//     {
//       sequelize,
//       modelName: 'user',
//     }
//   );

//   return user;
// };

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Note, {
        foreignKey: 'createdBy',
        as: 'notes'
      });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true
    }
  );

  return User;
};