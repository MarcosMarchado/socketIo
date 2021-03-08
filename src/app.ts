import express, { json, urlencoded } from 'express'
import cors from 'cors'

const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())

import userRoute from './controllers/userController'

app.use(cors({
    origin: "http://localhost:4200",
}))

app.use(userRoute)

export default app