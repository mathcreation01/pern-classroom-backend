// Site 24X7 monitoring with APM Insight
import AgentAPI from 'apminsight'
AgentAPI.config()

import express from 'express'
import subjectsRouter from './routes/subjects.js'
import usersRouter from './routes/users.js'
import classesRouter from "./routes/classes.js";
import cors from 'cors'
import securityMiddleware from './middleware/security.js'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth.js';
    
const app = express()
const PORT = 8000

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}))

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json())
//No valid license for Arcjet.
//app.use(securityMiddleware)
app.use('/api/subjects', subjectsRouter)
app.use('/api/users', usersRouter)
app.use('/api/classes', classesRouter)
 

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})