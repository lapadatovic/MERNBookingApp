import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from '../api-clients'
import { useState } from "react";
import { FacilitiesFilter, HotelTypesFilter, 
         Pagination, PriceFilter, SearchResultsCard, 
         StarRatingFilter 
        } from "../components";

const Search = () => {
    const search = useSearchContext(); 
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilies] =  useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] =  useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string | undefined>();

    const searchParams = { 
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkout: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption: sortOption,
    }

    const {data: hotelData} = useQuery(['searchHotels', searchParams], () => apiClient.searchHotels(searchParams));

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) => 
            event.target.checked
            ? [...prevStars, starRating]
            : prevStars.filter((star) => star !== starRating)
        );
    }
    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelTypeValue = event.target.value;
        setSelectedHotelTypes((prevHotelType) => 
            event.target.checked
            ? [...prevHotelType,  hotelTypeValue]
            : prevHotelType.filter((hotelType) => hotelType !== hotelTypeValue)
        );
    }
    const handleHotelFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelFacilityValue = event.target.value;
        setSelectedFacilies((prevHotelFacilities) => 
            event.target.checked
            ? [...prevHotelFacilities, hotelFacilityValue]
            : prevHotelFacilities.filter((hotelFacility) => hotelFacility !==hotelFacilityValue)
        );
    }

    return(
        // grid-cols-[250px_1fr] -> one col 250px, second all space left
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5"> 
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter 
                        selectedStars={selectedStars} 
                        onChange={handleStarsChange}
                    />
                    {/* TODO */}
                    <HotelTypesFilter 
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />

                    <FacilitiesFilter 
                        selectedHotelFacility={selectedFacilities}
                        onChange={handleHotelFacilitiesChange} 
                    />

                    <PriceFilter 
                        selectedPrice={selectedPrice} 
                        onChange={(value?:number)=>{
                            setSelectedPrice(value)
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}`: ''}
                    </span>
                    {/* TODO sort option */}
                <div>
                    <select 
                        className="p-2 border rounded-md w-full"
                        onChange={ (e) => {
                            setSortOption(e.target.value)
                        }} 
                        value={selectedPrice}
                    >   
                        {/* Default value */}
                        <option value=''> Sort By </option>
                        <option value='starRating'> Star Rating </option>
                        <option value='pricePerNightAsc'> Price Per Night (Low to high) </option>
                        <option value='pricePerNightDesc'>Price Per Night (High to low) </option>
                    </select>
                </div>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard hotel={hotel}/>
                ))}
                <div>
                    <Pagination 
                        page={hotelData?.pagination.page || 1} 
                        pages={hotelData?.pagination.pages || 1} 
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;