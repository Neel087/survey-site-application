import 'dotenv/config';

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI
}
export default config
