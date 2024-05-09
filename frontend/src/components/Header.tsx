import {Link} from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { SignOutButton } from './index'

const Header = () => {
    const {isLoggedIn } = useAppContext();

    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white">
                    <Link to="/"> MernHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn 
                        ? (
                            <>
                                <Link 
                                    to="/my-bookings" 
                                    className='cursor-pointer flex items-center  px-3 text-white font-bold hover:bg-gray-300'
                                > 
                                    My Bookings
                                </Link>
                                <Link 
                                    to="/my-hotels" 
                                    className='cursor-pointer flex items-center  px-3 text-white font-bold hover:bg-gray-300'
                                > 
                                    My Hotels
                                </Link>
                                <SignOutButton />
                            </>
                        )
                        : ( <Link 
                                to="/sign-in" 
                                className='cursor-pointer flex items-center text-blue-600 px-3 font-bold hover:bg-gray-300 bg-white'
                            > 
                                Sign In
                            </Link>
                        )
                    }    
                </span>
            </div>
        </div>
    )
}

export default Header;