import express, {Request, Response} from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? 
            req.query.page.toString() 
            : '1'
        );
        // how many pages we want to skip
        // pageNumber = 3 -> 
        // (3 - 1) * 5 = 10 -> skip first 10 items 
        // at the page 3 we show other results
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find().skip(skip).limit(pageSize);

        // create countDocuments with matching filters
        const total = await Hotel.countDocuments();

        const response: HotelSearchResponse = {
            data: hotels, 
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        };

        res.json(response);

    } catch (error) {
        console.log('error', error);
        res.status(500).json({message: "Something went wrong"});
    }
})


export default router;