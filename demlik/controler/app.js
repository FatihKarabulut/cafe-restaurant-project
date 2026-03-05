import express from "express"

import {createEndPoint} from "./endpoint.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.static("public"));
const port = 7272

await createEndPoint(app,port)
