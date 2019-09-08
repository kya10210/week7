const mongoose= require('mongoose');

let userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true},
    age: {
        type: Number,
        // min: 18,
        // max: 80,
        validate:{
            validator:function(value){
                if(value % 2 ===0 )
                    return true;
                else
                    return false;
            },
            message:'Should be an even age'
        },
        required: true},
    address: {
        type: String,
        set: function(newAddress){ //setter is not boolean function
            return "You live in " + newAddress;
        }
    },
    created: {
        type: Date,
        default: Date.now()}
});

userSchema.pre('save',function(){
    this.address = this.address + " City";
    this.age = this.age+2;
    //any logic
})
let userModel=mongoose.model('User',userSchema);
module.exports=userModel;