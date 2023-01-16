const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// turn the schema into a model (collection name, the schema variable)
const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
