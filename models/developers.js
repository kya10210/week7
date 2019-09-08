const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        enum: ['BEGINNER', 'EXPERT'],
        required: true,
        uppercase: true
        
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String 
    }
});
module.exports = mongoose.model('Developer', developerSchema);