import express from 'express';
import bodyParser from 'body-parser'
import verification from './controllers/verification';
import dotenv from 'dotenv'
import messageWebhook from './controllers/messageWebhook';

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    return res.status(200).json({message:"Webhook is running"})
})

app.get("/webhook", verification)
app.post("/webhook", messageWebhook)

app.listen(3000, ()=>{
    console.log("webhook is running")
})