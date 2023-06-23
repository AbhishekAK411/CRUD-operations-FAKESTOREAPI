import users from "../models/users.js";
import encrypt from "encryptjs";

export const register = async (req,res) =>{
    try{
        const {username, email, password, confirmPassword, role, pin} = req.body;
        const user = await users.find({email}).exec();
        if(user.length) return res.send("User is already registered.");

        if(password.length < 8 || confirmPassword.length < 8){
            return res.send("Password should be more than 8 characters.");
        }
        if(password !== confirmPassword){
            return res.send("Passwords do not match.");
        }

        let secretKeyPass = "secretKeyPass";
        let secretKeyPin = "secretKeyPin";
        const encryptPass = encrypt.encrypt(password, secretKeyPass, 256);
        const encryptPin = encrypt.encrypt(pin, secretKeyPin, 256);

        const newUser = new users({
            username,
            email,
            password : encryptPass,
            pin : encryptPin,
            role
        });
        await newUser.save();
        return res.send("User registered successfully.(CRUD)");
    }catch(err){
        return res.send(err);
    }
}