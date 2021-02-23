import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req: Request, res: Response) => {
    res.send('Teste Chat')
})

export default app