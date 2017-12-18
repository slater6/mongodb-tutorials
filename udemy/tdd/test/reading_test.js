const assert = require("assert");
const User = require("../src/user");

describe("Reading users from db", () => {
  let joe, maria, alex, zach;

  beforeEach(done => {
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  it("finds all users with name Joe", done => {
    User.find({
      name: "Joe"
    }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("finds all users with by id", done => {
    User.findOne({
      _id: joe._id
    }).then(user => {
      assert(user.name === joe.name);
      done();
    });
  });

  it("can skip and limit the result set", done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
