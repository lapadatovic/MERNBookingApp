import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import multer from 'multer'
const router = express.Router();
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
import verifyToken from '../middleware/auth';

const storage = multer.memoryStorage();
const upload = multer({
    storage : storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB,

    }
});

// api/my-hotels
router.post('/my-hotels', 
    verifyToken,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('country').notEmpty().withMessage('Country is required'),
        body('decription').notEmpty().withMessage('Description is required'),
        body('type').notEmpty().withMessage('Hotel type is required'),
        body('pricePerNight')
            .notEmpty()
            .isNumeric()
            .withMessage('Price per night is required and must be a number'),
        body('facility').notEmpty().isArray().withMessage('Facility are required'),
        
    ],
    upload.array("imageFiles",6) ,
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // 1. upload the images to cloud
            const imagesURls = await uploadImages(imageFiles);
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
});


router.get('/all-hotels', verifyToken, async (req:Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId});

        res.json(hotels);
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"})
    }
})

router.get('/my-hotels/:id', verifyToken, async (req:Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            // criteria to find hotel-> to match ID
            // And to match verifiedToken 
            _id: id,
            userId: req.userId
        });
        
        res.json(hotel);    
    } catch (error) {
        res.status(500).json({message: "Error fetching hotel"})
    }
});

router.put('/my-hotels/:hotelId', verifyToken, upload.array('imageFiles'), async (req: Request, res: Response) => {
    try {
        const upadtedHotel: HotelType = req.body;
        upadtedHotel.lastUpdate = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, upadtedHotel, { new: true});

        if(!hotel) return res.status(404).json({message: "Hotel not found"});

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [...updatedImageUrls, ...(upadtedHotel.imageUrls || [])]

        await hotel.save();    
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({message: 'Something went wrong'});
    }
});


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        // convert img to base64 string, so it can be processed by Cloudinary
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = "data:" + image.mimetype + ";base64," + b64;

        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
    });

    // is waiting all promises(our images to upload and to get the URLS);
    const imagesURls = await Promise.all(uploadPromises);
    return imagesURls;
}


export default router;