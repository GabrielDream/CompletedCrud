const mongoose = require('mongoose'); 

const newUser = new mongoose.Schema ({
    name : {
        type: String, 
        required: true
    }, 

    email : {
        type: String, 
        required: true,
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    }
});

const User = mongoose.model('User', newUser);

module.exports = User; 










