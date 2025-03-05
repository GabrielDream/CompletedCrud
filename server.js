require('dotenv').config();
const express = require('express'); 
const mongoose = require ('mongoose'); 
const cors = require ('cors'); 
const userRoutes = require('./Routes/userRoutes'); 

const app = express(); 
const port = process.env.PORT || 3040;

//Middlewares:
app.use(express.json()); 
app.use(cors()); 
app.use(express.static('public')); 

//Connection with mongo:
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then( () => console.log('CONNECTION WITH MONGO successed!'))
    .catch(err => console.log('FAILED TO CONECT')); 

app.use('/api', userRoutes); 

app.listen(port, () => {
    console.log (`RUNNING IN PORT ${port}`); 
}); 
