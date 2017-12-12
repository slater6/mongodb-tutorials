const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const joe = new User({
      name: "Joe",
      postCount: 2,
      posts: [{ title: "Post title 1" }, { title: "Post title 2" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "Post title 1");
        done();
      });
  });

  it("Can add subdocuments to an existing record", done => {
    const joe = new User({
      name: "Joe",
      posts: []
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "New Post" }, { title: "New Post 2" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "New Post");
        assert(user.posts[1].title === "New Post 2");
        done();
      });
  });

  it("Remove subdocuments from existing record", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Post" }, { title: "New Post 2" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "New Post 2");
        assert(user.posts.length === 1);
        done();
      });
  });
});
