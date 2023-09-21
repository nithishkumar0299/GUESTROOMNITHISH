//it connect the hotel database and show the room details
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar";

const HotelList = () => {
  const [hotelsList, setHotelsList] = useState([]);

  const getAllHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/hotels");
      if (response.data && response.data.length) {
        setHotelsList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHotels();
  }, []);
  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold my-6">Hotels List</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hotelsList.map((hotel, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">{hotel?.hotelName}</h3>
            <p>{hotel?.hotelDescription}</p>
            <span>{`${hotel?.rooms?.length} rooms available`}</span>
            <Link to={`/hoteldetails`} state={{ data: hotel }}>
              <a className="px-2 py-1 bg-slate-500">Preview</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
