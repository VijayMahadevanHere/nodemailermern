
const mongoose=require('mongoose')
console.log(process.env.MONGODB_ATLAS);
const connectDB=async()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGODB_ATLAS)
        console.log(`database connected at port ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)
    } 
}


module.exports=connectDB