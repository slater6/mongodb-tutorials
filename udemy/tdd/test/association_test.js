const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "My Dog",
      content: "My Dog is awesome!"
    });
    comment = new Comment({ content: "Interesting article!" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and blogPost", done => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then(user => {
        assert(joe.blogPosts[0].title === "My Dog");
        done();
      });
  });

  it("saves a full relational tree", done => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        assert(
          user.blogPosts[0].comments[0].content === "Interesting article!"
        );
        done();
      });
  });
});
