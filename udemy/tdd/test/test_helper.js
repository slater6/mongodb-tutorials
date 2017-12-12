const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://mongo.dev:27017/users_test", {
    useMongoClient: true
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Error", error);
    });
});

after(function() {
  mongoose.disconnect();
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
