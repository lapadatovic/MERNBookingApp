import express, { Request, Response } from 'express';
import {validationResult,check, body} from 'express-validator'
import multer from 'multer'
const router = express.Router();
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';

const storage = multer.memoryStorage()
const upload = multer({
    storage : storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB,

    }
})

// api/my-hotels
router.post('/my-hotels', 
    verifyToken,
    [
        body('name').notEmpty().withMessage('Name is required')
        
    ],
    upload.array("imageFiles",6) ,
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // 1. upload the images to cloud
            const uploadPromises = imageFiles.map(async (image) => {
                // convert img to base64 string, so it can be processed by Cloudinary
                const b64 = Buffer.from(image.buffer).toString('base64');
                let dataURI = "data:"+image.mimetype + ";base64," + b64;

                const res = await cloudinary.v2.uploader.upload(dataURI);

                return res.url;
            });

            // is waiting all promises(our images to upload and to get the URLS);
            const imagesURls = await Promise.all(uploadPromises);
            newHotel.imageUrls = imagesURls;
            newHotel.lastUpdate = new Date();
            newHotel.userId = req.userId;

            // 2.if upload was succesful, add the urls to the new hotel
            const hotel = new Hotel(newHotel);

            // 3. save the new hotel in our DB
            await hotel.save();

            // 4. return a 201 status
            res.status(201).send(hotel);

        } catch (error) {
            console.log("Error creating hotel: ", error)
            res.status(500).json({message: "Something went wrong"});
        }
})