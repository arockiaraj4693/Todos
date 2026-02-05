import express from "express";
import { dlt, router1, router3, updt } from "../model/todoSchema.js";

export const route2 = express.Router();
export const router4= express.Router();
export const router5= express.Router();
export const router6= express.Router();
route2.post("/r1", router1);
router4.get("/r1", router3);
router5.put("/r1/:id",updt);
router6.delete("/r1/:id",dlt);
