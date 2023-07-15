const express=require('express')
const goalRouter=require('./routes/goalRouter.js')
const userRouter=require('./routes/userRouter.js')
const app=express()
const dotenv=require('dotenv').config()
const colors=require('colors') 
const connectDB=require('./config/db.js')
const {handleError}=require("./middleware/errorMidddleware.js")

const port=process.env.PORT || 5000

connectDB()

 


app.use(express.json())
app.use(express.urlencoded({extended:false}))
 
app.get('/',(req,res)=>{

})

app.use('/api/goals',goalRouter)
app.use('/api/users',userRouter)
app.use(handleError)

app.listen(port,()=>{
    console.log(`listening to port at ${port}`)
})





