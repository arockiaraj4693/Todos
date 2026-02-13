import express from "express";
import cors from "cors";
import { route2, router4, router5, router6 } from "./routs/postRouts.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://todos-7gv2.vercel.app",
      "http://localhost:3000",
      "http://10.94.59.76:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/todos", route2);
app.use("/todos", router4);
app.use("/todos", router5);
app.use("/todos", router6);

export default app;
