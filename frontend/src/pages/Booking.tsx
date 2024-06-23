import { useQuery } from 'react-query';
import * as apiClient from '../api-clients'
import BookingForm from '../forms/BookingForm/BookingForm'
import { useSearchContext } from '../context/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookingDetailsSummary } from '../components';

const Booking = () => {
    
    const search = useSearchContext();
    // gets from URL 
    const { hotelId } = useParams();
    const [numberOfNights, setNumberOfNights] = useState<number>(0)
   

    useEffect(() => {
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 *24);

            setNumberOfNights(Math.ceil(nights));
        }
    },[search.checkIn, search.checkOut])

    const { data: currentUser} = useQuery('fetchCurrentUser', apiClient.fetchCurentUser);
    const { data: hotel } = useQuery('fetchHotelById', () => apiClient.fetchHotelById(hotelId as string),{
       enabled: !!hotelId,
    });

    if(!hotel) {
        return <></>
    }
    
    
    return (
        <div className='grid grid-flow-col md:grid-cols-[1fr_2fr] gap-2'>
            <BookingDetailsSummary 
                checkIn= {search.checkIn} 
                checkOut= {search.checkOut}
                adultCount= {search.adultCount}
                childCount= {search.childCount}
                numberOfNights= {numberOfNights}
                hotel={hotel}
            />
            {currentUser &&( 
                <BookingForm currentUser={currentUser}/>
            )}
        </div>
    )
}

export default Booking;