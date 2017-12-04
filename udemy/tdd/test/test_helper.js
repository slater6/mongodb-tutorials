const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo.dev:27017/users_test', { useMongoClient: true })

mongoose
    .connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Error',error)
    })