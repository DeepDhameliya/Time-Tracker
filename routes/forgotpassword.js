import { Router } from "express";
import { forgotget,forgotgets,emailpost,passwordpost } from "../controllers/forgotpassword.js";

const router1 = new Router();
const router2 = new Router();
const router3 = new Router();
const router4 = new Router();

router1.get("/",forgotget);
router4.get("/",forgotgets);
router2.post("/",emailpost); 
router3.post("/",passwordpost);

export default {router1,router4,router2,router3};