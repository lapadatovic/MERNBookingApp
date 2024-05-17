import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const GuestsSection = () => {
    const { register, formState: {errors}} = useFormContext<HotelFormData>();


    return(
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded">
                <label className="text-gray-700 text-sm font-semibold">
                        Adults
                        <input 
                            type="number"
                            min={1} 
                            className="border rounded w-full py-1 font-normal focus:outline-none" 
                            {...register('adultCount', {required: "Field is required"})} 
                        />
                        {
                            errors.adultCount && (
                                <span className="text-red-500">
                                    {errors.adultCount.message}
                                </span>
                            )
                        }
                </label>
                <label className="text-gray-700 text-sm font-semibold">
                        Children
                        <input 
                            type="number" 
                            min={0} 
                            className="border rounded w-full py-1 font-normal focus:outline-none" 
                            {...register('childCount', {required: "Field is required"})} 
                        />
                        {
                            errors.childCount && (
                                <span className="text-red-500">
                                    {errors.childCount.message}
                                </span>
                            )
                        }
                </label>
            </div>
        </div>
    )
}

export default GuestsSection;
