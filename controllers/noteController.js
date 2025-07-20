const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user }).sort({ updatedAt: -1 });
  res.json(notes);
};

exports.getNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.create({ title, content, tags, user: req.user });
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, content, tags, updatedAt: Date.now() },
    { new: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted' });
};
