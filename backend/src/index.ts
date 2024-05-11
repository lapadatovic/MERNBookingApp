import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser'
import path from 'path';
import {v2 as cloudinary} from 'cloudinary'


// connect to Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});


// connect to DB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    // We allow server to accept request only from this URL
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


// app.get('/api/test', async (req: Request, res: Response ) => {
//     res.json({message: "Hello from express endpoint"});
// });

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes);

app.listen(7000, () => {
    console.log("Server running at PORT:7000")
})