const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  it("saves a user", done => {
    const joe = new User({
      name: "Joe"
    });

    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
