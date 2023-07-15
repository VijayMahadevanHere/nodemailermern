const mongoose =require('mongoose')
const goalSchema= mongoose.Schema({
    user:{

        type:mongoose.Schema.Types.ObjectId,
        requied:true,
        ref:'User'
    },
    text:{
        type:String,
        requied:[true,'Please add a text field']
    }
},{
    timestamps:true
})


module.exports=mongoose.model('Goal',goalSchema)