import express from "express";
import { checkAdmin, checkBuyer, checkPin, checkRegister, checkSeller } from "../middlewares/auth.js";
import { register } from "../controllers/userController.js";
import { addProducts, deleteProducts, getProducts, updateProducts} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/register", checkRegister, register)

// Get All Products
router.post("/getProduct", checkBuyer, getProducts);

//Add Products
router.post("/addProduct", checkSeller, addProducts);

//Update Products
router.put("/updateProduct", checkPin, updateProducts);

//delete Products
router.delete("/deleteProduct", checkAdmin, deleteProducts);

export default router;