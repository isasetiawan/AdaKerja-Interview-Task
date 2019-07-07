import axios from 'axios'

const url = "https://graph.facebook.com/v3.3/me/messages?access_token="

/**
 * @description send user with id 'sender_psid' with a text message
 * @param {string} sender_psid 
 * @param {string} response 
 */
const sendTextMessage = (sender_psid, response) => {
    let req_body = {
        "messaging_type": "RESPONSE",
        "recipient":{
            "id":sender_psid
        },
        "message":{
            "text":response
        }
    }

    return axios.post(url+process.env.PAGE_ACCESS_TOKEN, req_body)
}

/**
 * 
 * @param {string} sender_psid user id to reply
 * @param {string} text question for the user
 * @param {Array} replies replies choices
 */

const sendQuickReply = (sender_psid, text, replies) => {
    let req_body = {
        "messaging_type": "RESPONSE",
        "recipient":{
            "id":sender_psid
        },
        "message":{
            text,
            "quick_replies":replies
        }
    }

    return axios.post(url+process.env.PAGE_ACCESS_TOKEN, req_body)
}

export {sendTextMessage, sendQuickReply}
