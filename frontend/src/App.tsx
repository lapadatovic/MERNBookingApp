import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout"
import { AddHotel, Register,SignIn, MyHotels, EditHotel, Search, Detail, Booking} from "./pages";
import { useAppContext } from "./context/AppContext";

function App() {

 const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" 
          element={
            <Layout> 
              <p>Home page</p>
            </Layout>
          } 
        />
        <Route
           path="/search" 
           element={
           <Layout>
              <Search />
           </Layout>} 
        />
        <Route 
          path="/register"
          element= { 
            <Layout> 
              <Register/> 
            </Layout>}
        />
        <Route 
          path="/sign-in"
          element= { 
            <Layout> 
              <SignIn/> 
            </Layout>}
        />
        <Route 
          path="/detail/:hotelId"
          element= { 
            <Layout> 
              <Detail/> 
            </Layout>}
        />
        {/* Protected routs, we cannont access if we are not logged in */}
        {isLoggedIn && (
          <>
            <Route 
              path="/add-hotel"
              element= {
              <Layout> 
                <AddHotel/> 
              </Layout>}
            />
            <Route 
              path="/my-hotels"
              element= { 
              <Layout> 
                <MyHotels/> 
              </Layout>}
            />
            <Route 
              path="/edit-hotel/:hotelId"
              element= { 
              <Layout> 
                <EditHotel/> 
              </Layout>}
            />
            <Route 
              path="/hotel/:hotelId/booking"
              element= { 
              <Layout> 
                <Booking/> 
              </Layout>}
            />
          </>
          )
        }
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    </Router>
  )
}

export default App
