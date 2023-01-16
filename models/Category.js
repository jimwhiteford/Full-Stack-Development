const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// turn the schema into a model (collection name, the schema variable)
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
