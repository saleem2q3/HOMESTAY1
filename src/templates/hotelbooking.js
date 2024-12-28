import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HotelBookingForm.css';

const BookingForm = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomDetails, setRoomDetails] = useState(null); // Store selected room details
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Fetch hotels from the backend
  useEffect(() => {
    axios
      .get('http://localhost:9999/hotels')
      .then((response) => {
        console.log('Fetched hotels:', response.data);
        setHotels(response.data);
      })
      .catch((error) => console.error('Error fetching hotels:', error));
  }, []);

  // Fetch rooms when a hotel is selected
  useEffect(() => {
    if (selectedHotel) {
      console.log('Fetching rooms for hotelId:', selectedHotel);
      axios
        .get(`http://localhost:9999/rooms?hotelId=${selectedHotel}`)
        .then((response) => {
          console.log('Fetched rooms:', response.data);
          setRooms(response.data);
        })
        .catch((error) => console.error('Error fetching rooms:', error));
    } else {
      setRooms([]);
    }
  }, [selectedHotel]);

  // Fetch room details when a room is selected
  useEffect(() => {
    if (selectedRoom) {
      const selected = rooms.find((room) => room.roomId === Number(selectedRoom));
      setRoomDetails(selected);
    } else {
      setRoomDetails(null);
    }
  }, [selectedRoom, rooms]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      room: { roomId: selectedRoom },
      checkIn,
      checkOut,
      adults,
      children,
    };

    console.log('Booking details:', bookingDetails);

    axios
      .post('http://localhost:9999/bookings', bookingDetails)
      .then((response) => {
        console.log('Booking successful:', response.data);
        alert('Booking successful!');
      })
      .catch((error) => {
        console.error('Error making booking:', error);
        alert('Error making booking. Please try again.');
      });
  };

  return (
    <div>
      <form className="hotel_book_form" onSubmit={handleSubmit}>
        <div className="form-group-container">
          <div className="form-group">
            <label>Select Hotel</label>
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
            >
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.hotelId} value={hotel.hotelId}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedHotel && rooms.length > 0 ? (
          <div className="form-group-container">
            <div className="form-group">
              <label>Select Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="">Select a room</option>
                {rooms.map((room) => (
                  <option key={room.roomId} value={room.roomId}>
                    {room.name} - ${room.price} per night
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : selectedHotel && rooms.length === 0 ? (
          <div className="form-group-container">
            <div className="form-group">
              <label>No rooms available for this hotel</label>
            </div>
          </div>
        ) : null}

        {roomDetails && selectedRoom && (
          <div className="room-details">
            <h3>Room Details</h3>
            <p><strong>Room No:</strong> {roomDetails.roomNo}</p>
            <p><strong>Room Name:</strong> {roomDetails.name}</p>
            <p><strong>Bed Type:</strong> {roomDetails.bedType}</p>
            <p><strong>Capacity:</strong> {roomDetails.capacity} persons</p>
            <p><strong>Price:</strong> ${roomDetails.price} per night</p>
          </div>
        )}

        <div className="form-group-container">
          <div className="form-group">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group-container">
          <div className="form-group">
            <label>Adults</label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Children</label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            >
              {[...Array(5)].map((_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="check-availability-btn" disabled={!selectedRoom}>
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
