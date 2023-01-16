const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

// turn the schema into a model (collection name, the schema variable)
const AuthorModel = mongoose.model("author", AuthorSchema);
module.exports = AuthorModel;
