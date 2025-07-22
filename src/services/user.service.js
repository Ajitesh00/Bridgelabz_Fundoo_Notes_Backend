import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

// //create new user
// export const newUser = async (body) => {
//   const data = await User.create(body);
//   return data;
// };

// //update single user
// export const updateUser = async (id, body) => {
//   await User.update(body, {
//     where: { id: id }
//   });
//   return body;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.destroy({ where: { id: id } });
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findByPk(id);
//   return data;
// };

//register user
export const registerUser = async (body) => {
  try {
    const existingUser = await User.findOne({ where: { email: body.email } });

    if (existingUser) {
      return {
        code: 400,
        data: {},
        message: 'User already exists'
      };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword
    });

    // const userData = newUser.toJSON(); // convert Sequelize object to plain JSON
    // delete userData.password;

    return {
      code: 201,
      data: {},
      message: 'User registered successfully'
    };

  } catch (error) {
    // Consistent error format
    return {
      code: error.code || 500,
      data: {},
      message: error.message || 'Something went wrong during registration'
    };
  }
};

//login user
export const loginUser = async (body) => {
  try {
    const user = await User.findOne({ where: { email: body.email } });

    if (!user) {
      return {
        code: 404,
        message: 'User not found',
        data: {}
      };
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'Invalid password',
        data: {}
      };
    }

    const userData = user.toJSON();
    delete userData.password;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },  // payload
      process.env.JWT_SECRET,              // secret key from .env
      { expiresIn: '1h' }                  // token validity
    );

    return {
      code: 200,
      message: 'User logged in successfully',
      data: { token, user: userData }
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Login failed',
      data: {}
    };
  }
};