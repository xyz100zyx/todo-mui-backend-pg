import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'localhost:3000',
}))

app.use('/auth', userRouter);
app.use('/userId', projectRouter);
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