const mongoose =require('mongoose')
const goalModel= mongoose.Schema({
    text:{
        type:String,
        requied:[true,'Please add a text field']
    }
},{
    timestamps:true
})


module.exports=mongoose.model('Goal',goalModel)