const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

//ROUTE 1: Create a user using : POST "/api/auth/createuser" No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
],async (req, res) =>{
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }
    //check whether the user with this email exists already
    try{
        let user = await User.findOne({ email: req.body.email});
        if(user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    //res.json(user)
    success = true;
    res.json({success, authtoken})

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],async (req, res) =>{
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log("Request body:", req.body);

    if(!errors.isEmpty()){
        console.log("Validation errors:", errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    //check whether the user with this email exists already
    try{
        console.log("Login attempt with:", email, password);
        let user = await User.findOne({ email});
        if(!user) {
            success = false;
            console.log("User not found for email:", email);
            return res.status(400).json({success, error: "Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            console.log("Password mismatch for user:", email);
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
    const data = {
        user:{
            id: user.id
        }
    }
    console.log("Generated token for user:", email);
    const authtoken = jwt.sign(data, JWT_SECRET);
    //res.json(user)
    success = true;
    res.json({success, authtoken})

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

//ROUTE 3: Get loggedin User Details using : POST "/api/getuser" Login required
router.post('/getuser', fetchuser , async (req, res) =>{
    
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router