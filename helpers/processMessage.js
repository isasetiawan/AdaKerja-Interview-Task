import initDatabase from "./database";
import {sendTextMessage, sendQuickReply} from "./sendMessage";
import nDaysTill from "./birthDay";
import constanta from "./consts";

const determineMostConfidenceNLPEntity = (nlp) => {
    let most_so_far = { confidence: 0.0 }
    let type = "nothing"
    if (nlp && nlp.entities) {
        Object.keys(nlp.entities).forEach(key=>{
            nlp.entities[key].forEach(entity => {
                if (entity.confidence >= most_so_far.confidence) {
                    most_so_far = entity
                    type = key
                }
            });
        })
    }
    let ret = {}
    ret[type] = most_so_far
    return ret
}

// users dialog state
let users_state = {}

const processMessage = async (event) => {

    // Save message
    try {
        let dbo = await initDatabase()
        dbo.collection("messages").insertOne(event)
    } catch (error) {
        throw error
    }

    // Extracting information
    let {message, sender} = event
    let {nlp, text} = message
    text = text.toLocaleLowerCase()
    
    // Get user State
    if (!users_state[sender.id]) {
        users_state[sender.id] = {state:"intro", name:"", birth:""}
    }
    let {state, name , birth} = users_state[sender.id]

    // Get user intent based on buil-in messenger API
    let entity = determineMostConfidenceNLPEntity(nlp)

    // FSM kind of
    switch (state) {
        case "intro":
            sendTextMessage(sender.id, "Hello, what is your name?")
            state = "ask_name"
            break;
        case "ask_name":
            name = text
            sendTextMessage(sender.id, `Hi ${name}, When did you birth?`)
            state = "ask_birthdate"
            break;
        case "ask_birthdate":
            if (!entity.datetime) {
                sendTextMessage(sender.id, "plese enter your birth date")
                break
            }
            birth = entity.datetime.value
            const replies = [
                {
                    content_type:"text",
                    title:"yes",
                    payload:"yes_count"
                },
                {
                    content_type:"text",
                    title:"no",
                    payload:"no_count"
                }
            ]
            sendQuickReply(sender.id, "Do you want to know how many days till your birth day?", replies)
            state = "ask_count"
            break
        case "ask_count":
            if (constanta.yes_asnwers.includes(text)) {
                let days = nDaysTill(birth)
                let reply = days === 0 ? `Happy birth day ${name}! 🎉🎉🎉. Wish you all the best` :`There are ${days} days left until your next birthday`
                sendTextMessage(sender.id, reply)
            }
            else if (constanta.no_answers.includes(text)) {
                sendTextMessage(sender.id, "Goodbye 👋")
            } else {
                sendTextMessage(sender.id, "I'm affraid, i don't understand")
                break
            }
            state = "intro"
            break
        default:
            sendTextMessage(sender.id, "Sorry")
            break;
    }

    //Update user state
    users_state[sender.id] = {state, name, birth}
    
}

export default processMessage
