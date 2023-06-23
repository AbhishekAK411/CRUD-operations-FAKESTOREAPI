import Users from "../models/users.js";
import encrypt from "encryptjs";

export const checkRegister = (req,res,next) =>{
    try{
        const {username, email, password, confirmPassword, pin, role} = req.body;
        if(!username) return res.send("username is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmPassword) return res.send("Confirm password is required.");
        if(!pin) return res.send("pin is required.");
        if(!role) return res.send("role is required.");
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkBuyer = async (req,res,next) =>{
    try{
        const { role, email } = req.body;
        if(!role) return res.send("Role is required.");
        if(!email) return res.send("Email is required.");
        const user = await Users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        let flag = false;
        if(role === user[0].role){
            flag=true;
        }
        if(flag){
            next();
        }else{
            return res.send("Please login with a client account.");
        }
    }catch(err){
        return res.send(err);
    }
}

export const checkSeller = async (req,res,next) =>{
    try{
        const {email, pin, title, price, description, category, image} = req.body;
        if(!email) return res.send("Email is required.");
        if(!pin) return res.send("Pin is required.");
        if(!title) return res.send("Title is required.");
        if(!price) return res.send("Price is required.");
        if(!description) return res.send("Description is required.");
        if(!category) return res.send("Category is required.");
        if(!image) return res.send("Image is required.");

        const user = await Users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        if(user[0].role !== 'seller'){
            return res.send("Invalid role.");
        }
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);
        console.log(decryptPin);
        if(pin !== decryptPin){
            return res.send("Pin is incorrect.");
        }
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkPin = async (req,res,next)=>{
    try{
        const {pin, email, title, price, description, category, image} = req.body;
        if(!pin) return res.send("Pin is required.");
        if(!email) return res.send("Email is required.");
        if(!title) return res.send("Title is required.");
        if(!price) return res.send("Price is required.");
        if(!description) return res.send("Description is required.");
        if(!category) return res.send("Category is required.");
        if(!image) return res.send("Image is required.");

        const user = await Users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        if(user[0].role === 'buyer'){
            return res.send("Invalid role.");
        }
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);
        if(pin !== decryptPin){
            return res.send("Invalid Pin.");
        }
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkAdmin = async (req,res,next) =>{
    try{
        const {id, email, pin} = req.body;
        if(!id) return res.send("ID is required.");
        if(!email) return res.send("Email is required.");
        if(!pin) return res.send("Pin is required.");

        const user = await Users.find({email}).exec();
        if(!user.length) return res.send("User not found.");
        let flag = false;
        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);
        if(user[0].role == 'admin' && pin == decryptPin){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Invalid role or incorrect pin.");
        }
    }catch(err){
        return res.send(err);
    }
}