import {Pool} from 'pg';
import dotenv from "dotenv"
dotenv.config()

const client = {

    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    max:10,
    idleTimeoutMillis: 20000,
    connectTimeoutMillis: 2000,
}

 const pool = new Pool(client);

export const getClient = async() => {
    try {
        return await pool.connect()
    }
    catch (err) {
        console.log(err.message);
    }
}

