import express from 'express';
import * as noteController from '../controllers/note.controller';
// import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all notes
router.get('/', userAuth, noteController.getAllNotes);

//route to get a single note by its id
router.get('/:id', userAuth, noteController.getNoteById);

//route to add a note
router.post('/', userAuth, noteController.addNote);

//route to update a note
router.put('/:id', userAuth, noteController.updateNote);

//route to delete a note
router.delete('/:id', userAuth, noteController.deleteNote);

export default router;