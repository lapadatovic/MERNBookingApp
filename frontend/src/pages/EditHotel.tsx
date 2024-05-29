import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-clients'
import ManageHotelForm from "../forms/ManageHotelForm";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { data: hotel } = useQuery('fetchMyHotelById', () => apiClient.fetchMyHotelById(hotelId || ''), {
        // THIS QUERY WILL RUN ONLY IF WE HAVE 'hotelId'
        // !! cheking only for truty value
            enabled: !!hotelId
        });
    
    const { mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {

        },
        onError: () => {

        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };
    
    return (

        <ManageHotelForm 
            hotel= {hotel}
            onSave={handleSave}
            isLoading={isLoading}
        />
    )
}

export default EditHotel;