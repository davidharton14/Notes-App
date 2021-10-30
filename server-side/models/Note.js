const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  state: {
    type: Boolean,
    default: false,
  },
  id_user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("note", NoteSchema);
