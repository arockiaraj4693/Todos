import app from "./app.js";
import { db } from "./data/todoData.js";

const port=8000;

db();

app.listen(port, () => {
    console.log ("server is listening to port",+port);
})