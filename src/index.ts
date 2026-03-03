import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3000

app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN as string],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))

app.use(json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
