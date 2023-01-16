// const assert = require("assert");
// const Post = require("../models/Post");

// describe("Read some data", () => {
//   let newPost;
//   let newPost2;

//   beforeEach(() => {
//     newPost = new Post({
//       slug: "a-title",
//       title: "a title",
//       content: "this is some contents",
//       photo: "http://www.aphotourl.com",
//       like: 0,
//     });
//     // newPost2 = new Post({
//     //   slug: "a-title2",
//     //   title: "a title2",
//     //   content: "this is some contents",
//     //   photo: "http://www.aphotourl.com",
//     //   like: 0,
//     // });
//     newPost.save().then(() => done());
//   });
//   it("find one Post", async () => {
//     const post = await Post.findOne({ _id: newPost._id });
//     assert(post.title === "a title");
//     done();
//   });
// });
