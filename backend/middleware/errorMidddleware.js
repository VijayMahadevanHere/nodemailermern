const { stack } = require("../routes/goalRouter")

const handleError=(err,req,res,next)=>{
    let statusCode=res.statusCode? res.statusCode:500
    res.json({
        message:err.message,
        stack:err.stack
    })
}


module.exports={
    handleError
}