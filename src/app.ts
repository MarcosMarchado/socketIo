import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "http://localhost:4200",
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

export default app