// import db from '../models';

// const Note = db.Note;
// const User = db.User;

// // Get all notes created by a user
// export const getAllNotes = async (userId) => {
//   try {
//     const notes = await Note.findAll({ where: { createdBy: userId } });

//     return {
//       code: 200,
//       message: 'Notes retrieved successfully',
//       data: notes
//     };
//   } catch (error) {
//     throw {
//       code: 500,
//       message: 'Failed to retrieve notes',
//       data: {}
//     };
//   }
// };

// // Get a note by its ID
// export const getNoteById = async (noteId) => {
//   try {
//     const note = await Note.findByPk(noteId);
//     if (!note) {
//       throw {
//         code: 404,
//         message: 'Note not found',
//         data: {}
//       };
//     }

//     return {
//       code: 200,
//       message: 'Note retrieved successfully',
//       data: note
//     };
//   } catch (error) {
//     throw {
//       code: error.code || 500,
//       message: error.message || 'Failed to retrieve note',
//       data: {}
//     };
//   }
// };

// // Add a new note
// export const addNote = async (noteBody, userId) => {
//   try {
//     const { title, description } = noteBody;

//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw {
//         code: 404,
//         message: 'User not found',
//         data: {}
//       };
//     }

//     const note = await Note.create({
//       title,
//       description,
//       createdBy: userId
//     });

//     return {
//       code: 201,
//       message: 'Note created successfully',
//       data: note
//     };
//   } catch (error) {
//     throw {
//       code: error.code || 500,
//       message: error.message || 'Failed to create note',
//       data: {}
//     };
//   }
// };

// // Update a note by its ID
// export const updateNote = async (noteId, noteBody) => {
//   try {
//     const note = await Note.findByPk(noteId);
//     if (!note) {
//       throw {
//         code: 404,
//         message: 'Note not found',
//         data: {}
//       };
//     }

//     await note.update(noteBody);

//     return {
//       code: 200,
//       message: 'Note updated successfully',
//       data: note
//     };
//   } catch (error) {
//     throw {
//       code: error.code || 500,
//       message: error.message || 'Failed to update note',
//       data: {}
//     };
//   }
// };

// // Delete a note by its ID
// export const deleteNote = async (noteId) => {
//   try {
//     const note = await Note.findByPk(noteId);
//     if (!note) {
//       throw {
//         code: 404,
//         message: 'Note not found',
//         data: {}
//       };
//     }

//     await note.destroy();

//     return {
//       code: 200,
//       message: 'Note deleted successfully',
//       data: {}
//     };
//   } catch (error) {
//     throw {
//       code: error.code || 500,
//       message: error.message || 'Failed to delete note',
//       data: {}
//     };
//   }
// };

import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
const Note = require('../models/note')(sequelize, DataTypes);

// Get all notes created by a user
export const getAllNotes = async (userId) => {
  try {
    const notes = await Note.findAll({ where: { createdBy: userId } });

    return {
      code: 200,
      message: 'Notes retrieved successfully',
      data: notes
    };
  } catch (error) {
    return {
      code: 500,
      message: 'Failed to retrieve notes',
      data: {}
    };
  }
};

// Get a note by its ID
export const getNoteById = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }

    return {
      code: 200,
      message: 'Note retrieved successfully',
      data: note
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Failed to retrieve note',
      data: {}
    };
  }
};

// Add a new note
export const addNote = async (noteBody, userId) => {
  try {
    const { title, description } = noteBody;

    const user = await User.findByPk(userId);
    if (!user) {
      return {
        code: 404,
        message: 'User not found',
        data: {}
      };
    }

    const note = await Note.create({
      title,
      description,
      createdBy: userId
    });

    return {
      code: 201,
      message: 'Note created successfully',
      data: note
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Failed to create note',
      data: {}
    };
  }
};

// Update a note by its ID
export const updateNote = async (noteId, noteBody) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }

    await note.update(noteBody);

    return {
      code: 200,
      message: 'Note updated successfully',
      data: note
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Failed to update note',
      data: {}
    };
  }
};

// Delete a note by its ID
export const deleteNote = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }

    await note.destroy();

    return {
      code: 200,
      message: 'Note deleted successfully',
      data: {}
    };
  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Failed to delete note',
      data: {}
    };
  }
};
