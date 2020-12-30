const mongoose = require("mongoose");
const config = require("../../config");

const connectDatabase = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("MongoDB Connection Success");
        })
        .catch(err => console.log(err));
}

module.exports = connectDatabase;