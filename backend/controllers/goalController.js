const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')

//@desc getGoals
//@route GET/api/goals
//@access private

const getGoals=asyncHandler(async(req,res)=>{
    let goal= await Goal.find({})
    res.status(200).json(goal)
})

//@desc setGoals
//@route POST/api/goal
//@access private

const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
    throw new Error("enter valid inputs..")
    }


    let goal = await Goal.create({
        text:req.body.text
    })


res.status(201).json(goal)
   
})
//@desc updateGoals
//@route PUT/api/goal/:id
//@access private

const updateGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
    
    res.status(400)
    throw new Error("Please add valid input ")

    }

    let goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
       throw  new Error("item not found")
    }

    let updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

res.status(201).json(updatedGoal)

    
})
//@desc updateGoals
//@route DELETE/api/goal/:id
//@access private

const deleteGoal=asyncHandler(async(req,res)=>{

    let goal= await  Goal.findById(req.params.id )

   
    if(!goal){
        res.status(400)
        throw new Error ("item not found")
    }
    await goal.deleteOne()
 
    res.status(201).json({id:req.params.id})

    
})
module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}