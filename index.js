import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import taskRouter from './routes/taskRoutes.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'localhost:3000',
}))

app.use('/auth', userRouter);
app.use('/', projectRouter);
app.use('/:userId', taskRouter)
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