import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
} from "antd";
import axios from "axios";

const { TextArea } = Input;

const API_ENDPOINT = "http://localhost:5000/api/v1/property/createPropertyWithRooms"; // Replace with your API endpoint

const CreateHotels = () => {
 const ownerId = localStorage.getItem("id")
  const [hotel, setHotel] = useState({
    hotelName: "",
    roomImage:'',
    location: "",
    noOfRooms: "",
    hotelDescription: "",
    rooms: [
      {
        roomName: "",
        description: "",
        // cost: "",
        floorSize:'',
        numberOfBeds:'',
        rentAmountPerDay:'',
        images: [], // Initialize with an empty array for multiple images
      },
    ],
    status: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const toggleStatus = (checked) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      status: checked,
    }));
  };

  const addRoom = () => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      rooms: [
        ...prevHotel.rooms,
        {
          roomName: "",
          description: "",
          // cost: "",
          floorSize:'',
          numberOfBeds:'',
          rentAmountPerDay:'',
          images: [], // Initialize with an empty array for multiple images
        },
      ],
    }));
  };

  const handleRoomChange = (e, roomIndex) => {
    const { name, value } = e.target;
    setHotel((prevHotel) => {
      const updatedRooms = [...prevHotel.rooms];
      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        [name]: value,
      };
      return {
        ...prevHotel,
        rooms: updatedRooms,
      };
    });
  };

  const handleImageChange = (roomIndex, imgIndex, value) => {
    setHotel((prevHotel) => {
      const updatedRooms = [...prevHotel.rooms];
      updatedRooms[roomIndex].images[imgIndex] = value;
      return {
        ...prevHotel,
        rooms: updatedRooms,
      };
    });
  };


  const handleImageChange1 = (e) => {
    const value = e?.target?.value || "";
    setHotel((prevHotel) => ({
      ...prevHotel,
      roomImage: value
    }));
  };



  const handleSubmit = async () => {
    try {
      const requestData = {
        hotelName: hotel.hotelName,
        location: hotel.location,
        noOfRooms: hotel.noOfRooms,
        hotelDescription: hotel.hotelDescription,
        status: hotel.status,
        rooms: hotel.rooms,
        ownerId:ownerId,
        roomImage:hotel.roomImage
      };

      const response = await axios.post(API_ENDPOINT, requestData);

      console.log("Hotel created successfully:", response.data);

      // Customize the success message or redirect the user if needed
      alert("Hotel created successfully!");
    } catch (error) {
      console.error("Error creating hotel:", error);

      // Customize the error message or handling if needed
      alert("Error creating hotel. Please try again later.");
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 mx-auto px-4">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
            className=""
          >
            <Form.Item label="Hotel Name">
              <Input
                onChange={handleChange}
                name="hotelName"
                value={hotel?.hotelName}
              />
            </Form.Item>

            <Form.Item label="Status">
              <Checkbox
                checked={hotel?.status}
                onChange={(e) => toggleStatus(e.target.checked)}
              >
                Active/In-active
              </Checkbox>
            </Form.Item>

            <Form.Item label="Description">
              <TextArea
                rows={4}
                onChange={handleChange}
                name="hotelDescription"
                value={hotel?.hotelDescription}
              />
            </Form.Item>

            <Form.Item label="Location">
              <TextArea
                rows={4}
                onChange={handleChange}
                name="location"
                value={hotel.location}
              />
            </Form.Item>

            <Form.Item
                    // key={imgIndex}
                    label={`Image for Property `}
                  >
                    <Input
                      name={`roomImage`}
                      value={hotel?.roomImage}
                      onChange={handleImageChange1}
                    />
                  </Form.Item>

            <Button onClick={addRoom}>Add Rooms</Button>

            {hotel.rooms.map((room, roomIndex) => (
              <div key={roomIndex}>
                <h2>Room {roomIndex + 1}</h2>
                <Form.Item label={`Room Name ${roomIndex + 1}`}>
                  <Input
                    name={`roomName`}
                    value={room?.roomName}
                    onChange={(e) => handleRoomChange(e, roomIndex)}
                  />
                </Form.Item>
                <Form.Item label={`floorSize ${roomIndex + 1}`}>
                  <InputNumber
                    name={`floorSize`}
                    value={room?.floorSize}
                    onChange={(value) =>
                      handleRoomChange(
                        {
                          target: {
                            name: "floorSize",
                            value: value,
                          },
                        },
                        roomIndex
                      )
                    }
                  />
                </Form.Item>
                <Form.Item label={`numberOfBeds ${roomIndex + 1}`}>
                  <InputNumber
                    name={`numberOfBeds`}
                    value={room?.numberOfBeds}
                    onChange={(value) =>
                      handleRoomChange(
                        {
                          target: {
                            name: "numberOfBeds",
                            value: value,
                          },
                        },
                        roomIndex
                      )
                    }
                  />
                </Form.Item>
                <Form.Item label={`Description ${roomIndex + 1}`}>
                  <Input
                    name={`description`}
                    value={room?.description}
                    onChange={(e) => handleRoomChange(e, roomIndex)}
                  />
                </Form.Item>
                <Form.Item label={`rentAmountPerDay ${roomIndex + 1}`}>
                  <InputNumber
                    name={`rentAmountPerDay`}
                    value={room.rentAmountPerDay}
                    onChange={(value) =>
                      handleRoomChange(
                        {
                          target: {
                            name: "rentAmountPerDay",
                            value: value,
                          },
                        },
                        roomIndex
                      )
                    }
                  />
                </Form.Item>
                {room.images.map((image, imgIndex) => (
                  <Form.Item
                    key={imgIndex}
                    label={`Image Link ${imgIndex + 1}`}
                  >
                    <Input
                      name={`images[${imgIndex}]`}
                      value={image}
                      onChange={(e) =>
                        handleImageChange(roomIndex, imgIndex, e.target.value)
                      }
                    />
                  </Form.Item>
                ))}
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (room.images.length < 5) {
                      setHotel((prevHotel) => {
                        const updatedRooms = [...prevHotel.rooms];
                        updatedRooms[roomIndex].images.push("");
                        return {
                          ...prevHotel,
                          rooms: updatedRooms,
                        };
                      });
                    }
                  }}
                >
                  Add Image
                </Button>
              </div>
            ))}

            <Form.Item>
              <button
                className="text-black bg-green-500 my-4 px-6 py-2 rounded"
                onClick={handleSubmit}
                // type="primary"
              >
              Save Property
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateHotels;