const express = require('express'); 
const User = require('../Models/User'); 
const { param } = require('../../CrudGit2/Routes/userRoutes');
const router = express.Router(); 

//ADD:
router.post ('/add-user', async (req, res) => {
    //Function to validate email:
    const validateEmail = (email) => {
        const rexEmail = /\S+@\S+\.\S+/;
        return rexEmail.test(email); 
    } 
    
    try{
        const { name, email } = req.body; 

        //Checking if user or email are empty
        if(!name || !email ) {
            return res.status(400).send('NAME and EMAIL are required!!'); 
        }

        //Checking if email is already being used:
        const existingEmail = await User.findOne( {email} ); 
        if(existingEmail) {
            return res.status(400).send('EMAIL IS ALREADY BEING USED!'); 
        }

        //Checking emails format:
        if(!validateEmail(email)) {
            return res.status(400).send('INVALID EMAIL FORMAT!'); 
        }

        const newUser = new User ( {name, email } );
        await newUser.save(); 
        res.status(201).send('DATA ADDED!!'); 
    }catch (err) {
        res.status(500).send('ERROR IN ADDING FUNCTION!!'); 
    }
});


module.exports = router;