const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'           //Ye mongo ka URI hai jijse ham connect hone jaa rahe hai 

const connectToMongo = () => {

    mongoose.connect(mongoURI)
        .then(() => console.log('conncted to mongoDB'))

};


module.exports = connectToMongo;