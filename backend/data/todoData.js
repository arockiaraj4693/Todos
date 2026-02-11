import mongoose from "mongoose";

export const db=() =>  { 
    mongoose.connect("mongodb+srv://arockiaraj:raju@todos.nfbu0ap.mongodb.net/?appName=todos")
.then(() => {
    console.log("db conneted successfully")
})
.catch((err)=>{
    console.log(err.message)});
}