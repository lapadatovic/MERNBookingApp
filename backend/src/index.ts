import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth';

// connect to DB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());


// app.get('/api/test', async (req: Request, res: Response ) => {
//     res.json({message: "Hello from express endpoint"});
// });

app.use('/api/users', userRoutes)
app.use('/api/users', authRoutes);

app.listen(3500, () => {
    console.log("Server running at PORT:3500")
})