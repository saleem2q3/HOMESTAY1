import React from 'react';
import '../css/about.css';
import Navbar from '../layout/Navbar';
const AboutPage = () => {
  return (
    <div><Navbar />
    <br/><br/><br/><br/>
    <div className="about-page">
      {/* YouTube Video Section */}
      <div className="video-section">
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/0hj9xOLcLMY?start=23"
          title="Tourism Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* About Company Section */}
      <div className="about-section">
        <h1>About the company</h1>
        <p>
          A homestay offers travelers a unique opportunity to immerse themselves in local culture by staying with a host family. It provides a more personal and authentic experience compared to traditional accommodations like hotels. Guests can enjoy home-cooked meals, participate in cultural activities, and learn about the community from a local perspective. 
        </p>
      </div>

      {/* Mission Sections */}
      <div className="mission-container">
        <div className="mission">
          <h2>Our mission</h2>
          <p>
          Our mission is to create a welcoming and authentic homestay experience that connects travelers with local cultures, fostering meaningful relationships and mutual respect. We strive to provide guests with a home away from home, offering comfort, cultural immersion, and personalized hospitality. 
          </p>
        </div>

        <div className="mission">
          <h2>Our mission</h2>
          <p>
By prioritizing authenticity, respect, and a sense of belonging, we aim to redefine the travel experience. Our focus is on cultivating a global community where hosts and guests come together to celebrate diversity and share unique stories.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;
