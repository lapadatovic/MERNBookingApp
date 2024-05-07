<!-- Explanation for bug fixes -->


<!-- Didnt reload page when we signout -->
Because we dont change the route when we sign out(we stay on base route ' / ' ). We have the problem with not showing SIGN IN button after we Sign Out. This problem will be resolved with  IVALIDATING {isError} = useQuery(...) from AppContext.
Firstly, In SignOutButton(component) we declare queryClient(which is using useQueryClient HOOK) from "react-query". After we make OnSuccess 'ASYNC' function, we are calling queryClient.invalidateQueries('validateToken') in mutation onSuccess.

So whenever we click signOut, signOut function which will give us back an expired token its going to force the validate token function to run again and it will check our expired token, it will see that token expired and then AppContext, {isError} is going to be true, so that means isLogedIn will be force. isLoggedIn: !isError.
