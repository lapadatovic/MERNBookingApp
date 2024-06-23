import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId: string,
    pricePerNight: number
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfoForm = ({hotelId, pricePerNight}: Props) => {

    const search = useSearchContext();
    const { isLoggedIn } = useAppContext()
    const { watch, register, handleSubmit, setValue, formState:{errors}} = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });

    const navigate = useNavigate();
    const location = useLocation();

    const checkIn = watch('checkIn');
    const checkOut = watch('checkOut');
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);

        navigate('/sign-in', {state: { from: location}});
    }


    const onSubmit = (data: GuestInfoFormData) => {
        // for destination we are sending "",  but for other we are taking from 'data'
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    }


    return(
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">${pricePerNight} per night</h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                     {/* checkin datepicker */}
                    <div>
                        <DatePicker 
                            required
                            selected={checkIn} 
                            onChange={(date) => setValue('checkIn', date as Date)} 
                            selectsStart 
                            startDate={checkIn} 
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white focus:outline-none start-date-picker"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    {/* checkout datepicker */}
                    <div>
                        <DatePicker 
                            required
                            selected={checkOut} 
                            onChange={(date) => setValue('checkOut', date as Date)} 
                            selectsStart 
                            startDate={checkIn} 
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-Out Date"
                            className="min-w-full bg-white focus:outline-none start-date-picker"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    {/* adult and childredn */}
                    <div className="flex bg-white px-1 py-2 justify-between">
                        <label className="items-center flex">
                            Adults:
                            <input 
                                type="number" 
                                className="w-full ml-2 p1 focus:outline-none font-bold" 
                                min={1} 
                                max={20}
                                {...register('adultCount', {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message: "There must be at least one adult"
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="items-center flex">
                            Children:
                            <input 
                                type="number" 
                                className="w-full ml-2 p1 focus:outline-none font-bold" 
                                min={0} 
                                max={20} 
                                {...register('childCount', {
                                    valueAsNumber: true
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                </div>
            
                {isLoggedIn  ? 
                    (
                        <button 
                            className="bg-blue-600 text-white w-full p-2 font-bold hover:bg-blue-500 text-xl mt-6"
                        >
                            Book Now
                        </button>)
                    : (
                        <button 
                            className="bg-blue-600 text-white w-full p-2 font-bold hover:bg-blue-500 text-xl mt-6"
                        >
                            Sign in to book
                        </button>
                    )
                }
                
            </form>
        </div>
    )
}

export default GuestInfoForm;