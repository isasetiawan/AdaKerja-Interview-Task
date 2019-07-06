/**
 * @description this end point used to verify messenger webhook
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const verification = (req, res) => {
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED")
            return res.status(200).send(challenge)
        } else {
            return res.status(403)
        }
    }

    return res.status(403).json({message:"token not provided"})
    
}

export default verification
