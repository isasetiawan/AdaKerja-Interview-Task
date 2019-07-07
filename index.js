import express from 'express';
import bodyParser from 'body-parser'
import verification from './controllers/verification';
import dotenv from 'dotenv'
import messageWebhook from './controllers/messageWebhook';
import { getMessages, getMessagesById, deleteMessage } from './controllers/messages';

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    return res.status(200).json({message:"Webhook is running"})
})

app.get("/webhook", verification)
app.post("/webhook", messageWebhook)

app.get("/messages", getMessages)
app.get("/messages/:id", getMessagesById)
app.delete("/messages/:id", deleteMessage)

app.listen(3000, ()=>{
    console.log("webhook is running")
})
