/*const config = {
env: process.env.NODE_ENV || 'development', 
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
'/mernproject' 
}
export default config*/
import 'dotenv/config';
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.VITE_PORT || 3000,
    jwtSecret: process.env.VITE_JWT_SECRET || "neel_secret_key",
    mongoUri: process.env.VITE_MONGODB_URI || "mongodb+srv://neel:neel123@cluster0.z6w3g5t.mongodb.net/surveysite?retryWrites=true&w=majority" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}
export default config
