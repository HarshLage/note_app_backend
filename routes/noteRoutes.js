const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
