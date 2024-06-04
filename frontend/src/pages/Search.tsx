import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from '../api-clients'
import { useState } from "react";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);


    const searchParams = { 
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkout: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
    }

    const {data: hotelData} = useQuery(['searchHotels', searchParams], () => apiClient.searchHotels(searchParams));
    
    return(
        // grid-cols-[250px_1fr] -> one col 250px, second all space left
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5"
        > 
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5"
                    >
                        Filter by:
                    </h3>
                    {/* TODO FILTERS */}
                </div>
            </div>
        </div>
    )
}

export default Search;