import "../helpers/processMessage"
import processMessage from "../helpers/processMessage";
/**
 * @description this end point used to verify messenger webhook
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
const messageWebhook = (req, res) => {
    let {object, entry} = req.body 
    if (object === "page") {
        entry.forEach(item => {
            let webhook_event = item.messaging[0]
            processMessage(webhook_event)
        });

        return res.status(200).send("EVENT_RECEIVED")
    } else {
        return res.status(400)
    }

}
export default messageWebhook