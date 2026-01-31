import mongoose from "mongoose";

export const db=() =>  { 
    mongoose.connect("mongodb://localhost:27017/todo-app")
.then(() => {
    console.log("db conneted successfully")
})
.catch((err)=>{
    console.log(err.message)});
}