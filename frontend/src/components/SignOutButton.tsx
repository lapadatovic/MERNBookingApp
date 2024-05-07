import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-clients'
import { useAppContext } from '../context/AppContext';


const SignOutButton = () => {

    const queryClient = useQueryClient()
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.logOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({
                message: 'Signed out!',
                type: "SUCCESS",
            });
        }, 
        onError: (error: Error) => {
            showToast({
                message: error.message || "Error",
                type: "ERROR",
            });
        },
    });

    const handleButtonClick = () => {
        mutation.mutate();
    }

    return (
        <button 
            onClick={handleButtonClick}
            className="text-blue-600 px-3 bg-white font-bold hover:bg-gray-100"
        >
            Sign Out
        </button>
    )
}

export default SignOutButton;