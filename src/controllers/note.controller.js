import * as NoteService from '../services/note.service';
import HttpStatus from 'http-status-codes';

// Get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.user.id); // assumes req.user.id from middleware
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Notes fetched successfully'
    });
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Failed to fetch notes'
    });
  }
};

// Get note by ID
export const getNoteById = async (req, res, next) => {
  try {
    const data = await NoteService.getNoteById(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Failed to fetch note'
    });
  }
};

// Add new note
export const addNote = async (req, res, next) => {
  try {
    const data = await NoteService.addNote(req.body, req.user.id); // user id from auth middleware
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Failed to create note'
    });
  }
};

// Update note
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Failed to update note'
    });
  }
};

// Delete note
export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(error.code || 500).json({
      code: error.code || 500,
      data: {},
      message: error.message || 'Failed to delete note'
    });
  }
};