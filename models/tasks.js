const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
            type: String
    },
    assign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    due: {
        type: Date,
    },
    status: {
         type: String, 
         enum:['InProgress', 'Complete']},
    //      validate: {validator: function(value){
    //          if( value === 'InProgress' || value === "Complete")
    //          return true
    //          else
    //          return false},
    //         message: 'status should be InProgress or Complete' }
    // },
    description: {
        type: String
    }
});
module.exports = mongoose.model('Task', taskSchema);