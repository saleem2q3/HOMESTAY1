import React from 'react';
import '../App.css';
import '../css/hotel.css';
import Navbar from '../layout/Navbar';
import HOTEL from '../video/video3.mp4';
import Google from '../templates/google';
import HotelCards from './hotelcards';
import HotelBookingForm from '../templates/hotelbooking';
export default function Hotel() {
  return (
    <div>
      <Navbar />
      <div className="big-video">
        <video autoPlay loop muted className="video">
          <source src={HOTEL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="data-info">
        <h1 className="h1">Resort style</h1>
        <p className="p">Travel for everyone</p>
        <p className="p">Why settle for just good enough when you can stay at a resort?</p>
        <HotelBookingForm />
      </div>
      <div className="hotel-container">
      <div className="hotel-wrapper">
        <div className="hotel-images">
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-s/0e/db/67/f9/pool.jpg"
            alt="Resort Pool"
            className="image image-top"
          />
        </div>
        <div className="hotel-content">
          <h5 className="tagline">RAISING COMFORT TO THE HIGHEST LEVEL</h5>
          <div className="line"></div>
          <h1 className="title">Welcome to Luviana Hotel Resort</h1>
          <p className="description">
            The Hotel Luviana is the right choice for visitors who are searching
            for a combination of charm and a convenient position from where to
            explore surroundings.
          </p>
          <p className="description">
            The rooms are arranged on the first, second, and third floors. On
            the top floor, there is also a charming terrace or solarium
            available for the use of guests, from where you can enjoy the view.
          </p>
          <button className="read-more">READ MORE</button>
        </div>
      </div>
    </div>
      <br/><br/><br/>
      <HotelCards/>
      {/* <HOTELCARDS/> */}
      <br/><br/><br/><br/><br/>
      <Google/>
      <br/><br/><br/><br/><br/>
      
    </div>
  );
}
