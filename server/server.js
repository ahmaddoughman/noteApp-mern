import express from 'express';
import dotenv from "dotenv"
import morgan from "morgan"
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import {connectDB} from "./config/db.js"
import cors from "cors"

dotenv.config({
    path: "./config/config.env"
});

const app = express();
app.use(morgan("dev"));
app.use(cors())

app.use(express.json());


app.use('/api/v1/notes', notes);
app.use('/api/v1/users', users);


app.listen(3001, async ()=>{
    try{
        connectDB();
        console.log("server is running on port 3000");
    }catch(err){
        console.log(err);
    }
})