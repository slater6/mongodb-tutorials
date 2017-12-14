const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "My Dog",
      content: "My Dog is awesome!"
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("deletes user blogPosts when user is deleted", done => {
    joe
      .remove()
      .then(() => {
        return BlogPost.count();
      })
      .then(result => {
        assert(result === 0);
        done();
      });
  });
});
