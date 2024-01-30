import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET;
const DB_URI = process.env.DB_URI;

import MongoStore from "connect-mongo";

const store = MongoStore.create({
    mongoUrl: DB_URI,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', function(e) {
    console.log('error found', e)
})

const sessionConfig = {
    store,
    name:'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

export default sessionConfig