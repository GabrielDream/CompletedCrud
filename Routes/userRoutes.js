const express = require('express'); 
const User = require('../Models/User'); 
const { param } = require('../../CrudGit2/Routes/userRoutes');
const req = require('express/lib/request');
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

//LISTUSER:
router.get ('/user', async (req, res) => {
    try{
        const users = await User.find(); 
        res.json(users);
    }catch (err) {
        res.status(500).send('IMPOSSIBLE TO LIST!'); 
    }
});


//DELETE FUNCTION:
router.delete('/user/:id', async (req, res) => {
    try {
        const {id} = req.params; 

        const user = await User.findById(id); 

        if(!user) {
            return res.status(404).send('USER DIDNT FOUN!'); 
        }

        await User.findByIdAndDelete(id); 
        res.status(200).send('DELETED!'); 
    }catch (err) {
        res.status(500).send('ERROR IN DELETING FUNCTION!'); 
    }
}); 


//UPDATE USER
router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, email } = req.body; 

        //If the fields are empty:
        if(!name  || !email) {
            return res.status(400).send('NAME and EMAIL are required!'); 
        }

        //if the user already exists in db:
        const user = await User.findById(id); 
        if(!user) {
            return res.status(404).send('USER NOT FOUND!');
        }

        //if email is already been used by another user:
        const emailExists = await User.findOne( {email} );  
        if(emailExists && emailExists._id.toString() !== id) {
            return res.status(400).send('THIS EMAIL IS ALREADY BEING USED! CHOOSE ANOTHER ONE!'); 
        }

        //FINALLY, UPDATE DATA:
        user.name = name;
        user.email = email; 

        await user.save(); 
        res.status(200).send('UPDATED!'); 
    }catch(err) {
        res.status(500).send('ERROR UPDATING USER!!'); 
    }
}); 


module.exports = router;