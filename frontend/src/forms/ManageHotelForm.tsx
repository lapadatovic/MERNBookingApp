import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitySection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string,
    city: string,
    country: string; 
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
    imageUrls: string[];
}

type Props = {
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
    // we make hotel optional cuz we need it only in EditHotel
    hotel?: HotelType,
}

const ManageHotelForm = ({onSave, isLoading, hotel }: Props) => {
    
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel);
    }, [hotel, reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // create new FormData and call API

        const formData = new FormData();
        if(hotel){ 
            formData.append('hotelId', hotel._id);
        }
        formData.append('name', formDataJson.name);
        formData.append('city', formDataJson.city);
        formData.append('country', formDataJson.country);
        formData.append('description', formDataJson.description);
        formData.append('type', formDataJson.type);
        formData.append('pricePerNight', formDataJson.pricePerNight.toString());
        formData.append('starRating', formDataJson.starRating.toString());
        formData.append('adultCount', formDataJson.adultCount.toString());
        formData.append('childCount', formDataJson.childCount.toString());
        
        // we can have more facilities so we need to loop through all 
        formDataJson.facilities.forEach((facility,index) => {
            formData.append(`facilities[${index}]`, facility);
        })

        // [imag1.jpg, image2.jpg, image3.jpg]
        // and delete image2, image 3
        // imageUrls = [image1.jpg]
        if(formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            })
        }

        // we need to convert imagefiles to Array bcz imageFile is of type FileList
        // and FileList type do not allow us to use forEach
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile );
        });

        // calling onSave
        onSave(formData);
    });
    
    return(
        <FormProvider {...formMethods}>
            <form 
                className="flex flex-col gap-10" 
                onSubmit={onSubmit}
            >
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button 
                        //disabled -> User cannot re-click save until data is saving
                        // prevent to create copies of data
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-600 p-2 font-bold rounded text-white hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                       {isLoading ? "Saving... " : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm;