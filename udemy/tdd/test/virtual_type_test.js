const assert = require("assert");
const User = require("../src/user");

describe("Virtual Types", () => {
  it("postCount returns number of posts", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Post" }, { title: "New Post 2" }]
    });

    joe.save().then(() => {
      assert(joe.postCount === 2);
      done();
    });
  });
});
