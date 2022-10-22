import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import authCheck from './utils/authCheck.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(cookieParser())

app.use('/auth', userRouter);
app.use('/', projectRouter); //add middleware authCheck
app.use('/:userId', taskRouter) //add middleware authCheck
app.get('/', (req, res) => {
    res.json({
        status: 'success'
    })
})

app.listen(3333, (err) => {
    if(err){
        console.log('Start is failed')
    }

    console.log('Server is started')
})