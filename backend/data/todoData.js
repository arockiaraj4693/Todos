import mongoose from "mongoose";

export const db=() =>  { 
    mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("db conneted successfully")
})
.catch((err)=>{
    console.log(err.message)});
}