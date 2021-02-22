import express, {Request, Response} from 'express'

const app = express()
//Rotas

app.get('/', (req: Request, res: Response)=>{
    res.send('Teste Chat')
})

export default app