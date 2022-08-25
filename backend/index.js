// require('dotenv').config();
require('dotenv').config();
console.log(process.env)
const express = require("express");
const cors = require("cors");

const Stripe=require("stripe")  ;
const stripe=Stripe(process.env.STRIPE_SECRET);

const app =express();
const Port = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async (req , res)=>{
    try {
        const {name}=req.body;
        if(!name) return res.status(400).json({message:'Please Enter Your Name '});
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Math.round(25*1000),
            currency:'INR',
            payment_method_types:['card'],
            metadata:{name}
        });
        const clientSecrets=paymentIntent.client_secret;
        res.json({message:'Payment initiate starting' , clientSecrets});
    } catch (err) {
        console.log(`error :  ${err}`)
        res.status(500).json({message:'Internal server error'});
    }
    
})
app.get('/l',async (req,res)=>{
    try{
        res.json({message:'Payment initiate starting'});
    }catch(er){
        res.status(500).json({message:'Internal server error'});

    }
})


app.listen(Port,()=>{
    console.log(`Server is running at : ${Port}`)
})