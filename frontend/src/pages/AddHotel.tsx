import { useMutation } from "react-query";
import * as apiClient from '../api-clients'
import { useAppContext } from "../context/AppContext";
import ManageHotelForm from "../forms/ManageHotelForm";


const AddHotel = () => {
    const { showToast } = useAppContext();

    // useMutation to API call addMyHotel 
    const { mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({
                message: "Hotel Saved",
                type: 'SUCCESS'
            });
        },
        onError: () => {
            showToast({
                message: 'Something went wrong',
                type: 'ERROR'
            });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }

    return(
        <ManageHotelForm 
           onSave={handleSave}
           isLoading={isLoading}
        /> 
    )
}

export default AddHotel;