import initDatabase from "../helpers/database";
import {ObjectId} from 'mongodb'


/**
 * @description this end point used to get all saved message from database
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getMessages = async (req, res) => {
    try {
        let dbo = await initDatabase()
        let user_messages = await dbo.collection('messages').find({}).toArray()
        return res.status(200).json({msg:"data retrieved", user_messages})        
    } catch (error) {
        return res.status(500).json({msg:"error internal server"})
    }
}

/**
 * @description this end point used to get one message with id from database
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const getMessagesById = async (req, res) => {
    try {
        let {id} = req.params
        let dbo = await initDatabase()
        let user_message = await dbo.collection('messages').find(ObjectId(id)).toArray()
        return res.status(200).json({user_message})        
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg:"error internal server"})
    }
}

/**
 * @description this end point used to delete one message with id from database
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const deleteMessage = async (req, res) => {
    try {
        let {id} = req.params
        let dbo = await initDatabase()
        let deletOp = await dbo.collection('messages').deleteOne({_id:ObjectId(id)})
        return res.status(200).json({msg:`${deletOp.result.n} data deleted`})        
    } catch (error) {
        return res.status(500).json({msg:"error internal server"})
    }
}

export {getMessages, getMessagesById, deleteMessage}
