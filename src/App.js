import './App.css';
import Home from './templates/home';
import Hotel from './templates/hotel';
import Footer from './layout/footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './register/Login ';
import Register from './register/register';
import Navbar from './layout/Navbar';
import Navbar2 from './layout/navbar-2';
import SuccessPage from './register/SuccessPage ';
import Profile from './templates/profile';
import TOUR from './templates/tour';
import ABOUT from './templates/about';
import HOTELCARDS from './templates/hotelcards';
import Google from './templates/google';
import AdminLogin from './Admin/admin_login';
import Admin_Hompage from './Admin/admin_homepage';
import HotelBookingForm from './templates/hotelbooking'
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/hotels" element={<Hotel/>}/>
          <Route exact path="/hotelcards" element={<HOTELCARDS/>}/>
          <Route exact path="/tour" element={<TOUR />}/>
          <Route exact path="/about" element={<ABOUT />}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/success" element={<SuccessPage/>}/>
          <Route exact path="/Home" element={<Navbar2/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/google" element={<Google/>}/>
          <Route exact path="/admin" element={<AdminLogin />}/>
          <Route exact path="/adminhome" element={<Admin_Hompage/>}/>
          <Route path="/booking" element={<HotelBookingForm />} />
          <Route path="/confirmation" element={<div>Your booking is confirmed!</div>} />
        </Routes>
        <br/><br/><br/><br/>
        <Footer/>
    </Router>
    </div>
  );
}

export default App;
