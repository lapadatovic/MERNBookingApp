import { Footer, Header, Hero, SearchBar } from "../components/index"
import { useLocation } from "react-router-dom";
interface Props {
    children: React.ReactNode;
}


const Layout = ({children}: Props) => {
    const location = useLocation();
    const hideSearchBarPaths = ['/register', '/sign-in']
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto">
             {!hideSearchBarPaths.includes(location.pathname) && <SearchBar />}
            </div>
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout