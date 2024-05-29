import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout"
import { AddHotel, Register,SignIn, MyHotels, EditHotel } from "./pages";
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
        <Route path="/" 
          element={
            <Layout> 
              <p>Search Page</p>
            </Layout>
          } 
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
        {/* Protected routs, we cannont acces if we are not logged in */}
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
          </>
          )
        }

        <Route path="/search" element={<></>} />
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    </Router>
  )
}

export default App
