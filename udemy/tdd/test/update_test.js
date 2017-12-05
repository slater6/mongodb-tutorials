const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({name : 'Joe'})
        joe.save().then(() => done())
    })

    function assertName(operation,done){
        operation
        .then(() => {
            User.findOne({
                _id : joe._id
            }).then((user) => {
                assert(user.name === 'Alex')
                done()
            })
       })
    }

    it('instance set and save', (done) => {
       joe.set('name','Alex')
       assertName(joe.save(),done)
    })

    it('A model instance can update', (done) => {
        assertName(joe.update({name:'Alex'}),done)
    })
})