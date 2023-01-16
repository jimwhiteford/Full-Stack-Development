require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const PostModel = require("./models/Post.js");
const CategoryModel = require("./models/Category.js");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getPosts", (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.send(result);
      res.status(200);
    }
  });
});

app.get("/getCategories", (req, res) => {
  CategoryModel.find({}, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.send(result);
      res.status(200);
    }
  });
});

app.get("/:slug", (req, res) => {
  const slugTemp = req.params.slug;
  PostModel.find({ slug: slugTemp }, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.json(result);
      res.status(200);
    }
  });
});

app.get("/category/:slug", (req, res) => {
  const slugTemp = req.params.slug;
  PostModel.find({ category: slugTemp }, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.json(result);
      res.status(200);
    }
  });
});

app.get("/like/:id", (req, res) => {
  const id = req.params._id;
  PostModel.findById(id, (err, result) => {
    if (err) {
      console.log("this is the error" + err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createPost", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    const insertPost = await newPost.save();
    return res.status(200).json(insertPost);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
});

app.put("/updateLike", async (req, res) => {
  const newLike = req.body.newLike;
  const id = req.body.id;

  try {
    await PostModel.findById(id, (err, likeToUpdate) => {
      likeToUpdate.like = newLike;
      likeToUpdate.save();
    });
  } catch (error) {
    console.log("This is the error", error);
  }

  res.send("updated");
});

module.exports = app;
