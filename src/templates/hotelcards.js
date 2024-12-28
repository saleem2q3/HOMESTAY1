import React from 'react';
import '../css/hotelcard.css';
import { FaHotel, FaUtensils, FaSpa, FaSwimmer, FaBirthdayCake, FaDumbbell, FaChevronDown } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HotelCards() 
{
  return (
    <div>
      <div className="card-container">
        <div className="hotel-image">
          <img 
            src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" 
            alt="hotel exterior" 
          />
        </div>
        <div className="hotel-info">
          <div className="heading">
            <h1 className="title">W Doha Hotel and Residences</h1>
            <h4 className="subtitle">Midtown East Grand Central</h4>      
          </div>
          <div className="reviews">
            <ul className="stars">
              <li><span className="yellow"><i className="fa fa-star" aria-hidden="true"></i></span></li>
              <li><span className="yellow"><i className="fa fa-star" aria-hidden="true"></i></span></li>
              <li><span className="yellow"><i className="fa fa-star" aria-hidden="true"></i></span></li>
              <li><i className="fa fa-star" aria-hidden="true"></i></li>
              <li><i className="fa fa-star" aria-hidden="true"></i></li>
            </ul>
            <ul className="trip-advisor">
              <li><span><i className="fa fa-tripadvisor" aria-hidden="true"></i></span></li>
              <li><i className="fa fa-dot-circle-o" aria-hidden="true"></i></li>
              <li><i className="fa fa-dot-circle-o" aria-hidden="true"></i></li>
              <li><i className="fa fa-dot-circle-o" aria-hidden="true"></i></li>
              <li><i className="fa fa-circle-o" aria-hidden="true"></i></li>
              <li><i className="fa fa-circle-o" aria-hidden="true"></i></li>
            </ul>
          </div>
          <div className="details">
            <p>Ezdan Hotel & Suites offers a variety of suites and apartments for long and short stays in Doha. It overlooks the Arabian Gulf and is nearby the...</p>
          </div>
        </div>
        <div className="hotel-price">
          <div className="pricing-content">
            <div className="guarantee">
              <span><i className="fa fa-check-circle" aria-hidden="true"></i></span> Price Guarantee
            </div>
            <div className="price">
              <h3><span>Room only from</span><br />$98.00</h3>
            </div>
          </div>
          <button className="btn-cta">View Rooms <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <br/>
      <div className="rooms-and-suites">
      <h2>Raising Comfort to the Highest Level</h2>
      <h3>Rooms & Suites</h3>
      <div className="rooms-container">
        {/* Room 1 */}
        <div className="room-card">
          <img
            src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" // Replace with the actual image path
            alt="Superior Double Room"
            className="room-image"
          />
          <div className="room-details">
            <h4>Superior Double Room</h4>
            <p>$129 / per night</p>
            <button className="book-button">Book Now</button>
          </div>
        </div>
        
        {/* Room 2 */}
        <div className="room-card">
          <img
            src="https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?semt=ais_hybrid" // Replace with the actual image path
            alt="Classic Double Room"
            className="room-image"
          />
          <div className="room-details">
            <h4>Classic Double Room</h4>
            <p>$159 / per night</p>
            <button className="book-button">Book Now</button>
          </div>
        </div>
        
        {/* Room 3 */}
        <div className="room-card">
          <img
            src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg" // Replace with the actual image path
            alt="Comfort Triple Room"
            className="room-image"
          />
          <div className="room-details">
            <h4>Comfort Triple Room</h4>
            <p>$179 / per night</p>
            <button className="book-button">Book Now</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
