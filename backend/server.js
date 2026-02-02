import app from "./app.js";
import dotenv from 'dotenv';
import { db } from "./data/todoData.js";


dotenv.config({path : "backend/config/config.env"});
const PORT = process.env.PORT || 8000

db();

app.listen(PORT, () => {
    console.log ("server is listening to port",+PORT);
})