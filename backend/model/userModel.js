const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter a name field']
    },
    email:{
        type:String,
        required:[true,'please enter a email field'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please enter a password field']
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
      
    
},{
    timeStamps:true
})

module.exports=mongoose.model('User',userSchema)