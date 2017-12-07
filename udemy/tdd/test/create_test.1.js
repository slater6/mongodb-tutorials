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
});
