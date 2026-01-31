import mongoose from "mongoose";

const todoSchema= mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description"]
    },
    createdAt: {
    type: Date,
    default: Date.now
},
});

export const todoModel = mongoose.model('Tododt',todoSchema);
//create a item
export const router1 =async (req, res) => {
    const {title, description} = req.body;
    // const newTodo ={
    //     id: todos.length +1,
    //     title,
    //     description
    // };
    // todos.push(newTodo);
    // console.log(todos);
    try {
        const newTodo = new todoModel({title, description})
    await newTodo.save();
    res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
    
}
//update a item
export const updt=async(req, res) => {
    try {
        const {title, description} =req.body;
        const id = req.params.id;
        const updtid = await todoModel.findByIdAndUpdate(
            id,
            {title, description},
            {new:true}
        )
        if(!updtid) {
            return res.status(404).json({message: "Todo not found"});
        }
        res.json(updtid);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}
// delete a item
export const dlt=async(req,res)=>{
    try {
        const dltdt=req.params.id;
        await todoModel.findByIdAndDelete(dltdt);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}
    
export const router3 =async (req, res) => {
    try {
        const todos= await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }    
}