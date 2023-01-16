const Post = require("../models/Post");
const assert = require("assert");

describe("Creating data in MongoDB", () => {
  it("Create a New Post", () => {
    const newPost = new Post({
      slug: "a-title",
      title: "a title",
      content: "this is some contents",
      photo: "http://www.aphotourl.com",
      like: 0,
    });
    newPost.save().then(() => {
      assert(!newPost.isNew);
    });
  });
});
