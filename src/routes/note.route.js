import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to get all notes
router.get('/', userAuth, noteController.getAllNotes);

// Route to get a single note by its ID
router.get('/:id', userAuth, noteController.getNoteById);

// Route to add a note
router.post('/', userAuth, noteController.addNote);

// Route to update a note
router.put('/:id', userAuth, noteController.updateNote);

// Route to delete a note
router.delete('/:id', userAuth, noteController.deleteNote);

// Route to archive or unarchive a note
router.put('/:id/archive', userAuth, noteController.archiveNote);

// Route to trash or restore a note
router.put('/:id/trash', userAuth, noteController.trashNote);

// Route to pin or unpin a note
router.put('/:id/pin', userAuth, noteController.pinNote);

// Route to set or unset a reminder for a note
router.put('/:id/reminder', userAuth, noteController.setReminder);

// Route to add a label to a note
router.post('/:id/labels', userAuth, noteController.addLabel);

// Route to remove a label from a note
router.delete('/:id/labels', userAuth, noteController.removeLabel);

// Route to set or unset a collaborator for a note
router.put('/:id/collaborator', userAuth, noteController.setCollaborator);

export default router;