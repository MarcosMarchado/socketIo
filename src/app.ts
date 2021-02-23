import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

export default app