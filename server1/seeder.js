const axios = require("axios");

const API_ENDPOINT = "http://localhost:5000/api/v1/hotels/createHotel";

const generateRandomHotelData = () => {
  // Generate random hotel data for demonstration
  const randomName = `Hotel ${Math.floor(Math.random() * 1000)}`;
  const randomLocation = `Location ${Math.floor(Math.random() * 1000)}`;
  const randomNoOfRooms = Math.floor(Math.random() * 200);
  const randomDescription = `Description for ${randomName}`;
  const randomStatus = Math.random() < 0.5; // Randomly set active or inactive

  const hotelData = {
    hotelName: randomName,
    location: randomLocation,
    noOfRooms: randomNoOfRooms,
    hotelDescription: randomDescription,
    status: randomStatus,
    rooms: [],
  };

  // Generate random room data
  for (let i = 1; i <= 5; i++) {
    const randomRoomName = `Room ${i}`;
    const randomDescription = `Description for ${randomRoomName}`;
    const randomCost = Math.floor(Math.random() * 500);

    hotelData.rooms.push({
      roomName: randomRoomName,
      description: randomDescription,
      cost: randomCost,
      images: [], // You can add image data as needed
    });
  }

  return hotelData;
};

const addMultipleHotels = async (count) => {
  try {
    for (let i = 0; i < count; i++) {
      const hotelData = generateRandomHotelData();

      // Make a POST request to create a new hotel
      const response = await axios.post(API_ENDPOINT, hotelData);
        console.log(response)}
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Usage: Call the addMultipleHotels function with the desired count (e.g., 10)
addMultipleHotels(10);
