import {MongoClient} from 'mongodb'


const initDatabase = async () => {
    let {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME} = process.env
    try {
        let connection = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/`
        let client = await MongoClient.connect(connection, {useNewUrlParser:true})
        return client.db(MONGO_DB_NAME)
    } catch (error) {
        throw error
    }
}
export default initDatabase
