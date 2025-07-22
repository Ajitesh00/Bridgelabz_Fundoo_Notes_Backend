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
    console.error('Error in getAllNotes:', error);
    return {
      code: 500,
      message: 'Failed to retrieve notes',
      data: []
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
    console.error('Error in getNoteById:', error);
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
    const { title, description, color } = noteBody;
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
      color: color || 'default',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      createdBy: userId
    });
    // Fetch the note to ensure all fields are included
    const createdNote = await Note.findByPk(note.id);
    return {
      code: 201,
      message: 'Note created successfully',
      data: createdNote
    };
  } catch (error) {
    console.error('Error in addNote:', error);
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
    console.error('Error in updateNote:', error);
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
    console.error('Error in deleteNote:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to delete note',
      data: {}
    };
  }
};

// Archive or unarchive a note by its ID
export const archiveNote = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }
    await note.update({
      isArchived: !note.isArchived,
      isTrash: false
    });
    return {
      code: 200,
      message: note.isArchived ? 'Note unarchived successfully' : 'Note archived successfully',
      data: note
    };
  } catch (error) {
    console.error('Error in archiveNote:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to archive/unarchive note',
      data: {}
    };
  }
};

// Trash or restore a note by ID
export const trashNote = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }
    await note.update({
      isTrash: !note.isTrash,
      isArchived: false
    });
    return {
      code: 200,
      message: note.isTrash ? 'Note restored successfully' : 'Note moved to trash successfully',
      data: note
    };
  } catch (error) {
    console.error('Error in trashNote:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to trash/restore note',
      data: {}
    };
  }
};

// Pin or unpin a note by ID
export const pinNote = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return {
        code: 404,
        message: 'Note not found',
        data: {}
      };
    }
    await note.update({
      isPinned: !note.isPinned
    });
    return {
      code: 200,
      message: note.isPinned ? 'Note unpinned successfully' : 'Note pinned successfully',
      data: note
    };
  } catch (error) {
    console.error('Error in pinNote:', error);
    return {
      code: error.code || 500,
      message: error.message || 'Failed to pin/unpin note',
      data: {}
    };
  }
};