import dotenv from "dotenv";
dotenv.config();

console.log("Loaded QSTASH TOKEN:", process.env.QSTASH_TOKEN);

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_NEXT_SIGNING_KEY, 
    QSTASH_CURRENT_SIGNING_KEY, 
    QSTASH_TOKEN, 
    QSTASH_URL,
    SERVER_URL
} = process.env;
