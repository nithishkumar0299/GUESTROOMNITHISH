//it's show the non booked and their detail on screen
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

import {
  Button,
  Card,
  Image,
  Tag,
  Modal,
  DatePicker,
  Space,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { LiaBedSolid } from "react-icons/lia";
const { Meta } = Card;
const { RangePicker } = DatePicker;

const PropertyDetails = () => {
  const customerId = localStorage.getItem("id");
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkAvailability, setCheckAvailability] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {
    getByProperty();
  }, [id]);

  const getByProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/rooms/getRoomsByProperties/${id}`
      );
      const roomsData = response?.data?.data;
      if (roomsData && roomsData?.length) {
        const convertedRoomsData = convertGoogleDriveUrls(roomsData);
        if (convertedRoomsData && convertedRoomsData?.length) {
          setRooms(convertedRoomsData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createBooking = async () => {
    if (customerId) {
      await axios
        .post("http://localhost:5000/api/v1/booking/createBooking", {
          ...checkAvailability,
          customerId: customerId,
        })
        .then((res) => {
          console.log(res);
          message.success("Booking has been created");
          setConfirmLoading(false);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          setConfirmLoading(false);
          setOpen(false);
        });
    } else {
      message.error("Login To Book Your Room.");
    }
  };

  const checkRoomAvailability = async () => {
    await axios
      .post(
        "http://localhost:5000/api/v1/booking/checkAvaiability",
        checkAvailability
      )
      .then((res) => {
        console.log(res);
        message.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function convertGoogleDriveUrls(data) {
    const convertedData = [...data]; // Create a copy of the data to avoid mutating the original data

    for (const item of convertedData) {
      for (let i = 0; i < item.photos.length; i++) {
        const originalUrl = item.photos[i];
        const parts = originalUrl.split("/");
        const file_id = parts[parts.length - 2];
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${file_id}`;
        item.photos[i] = convertedUrl;
      }
    }

    return convertedData; // Return the modified data
  }
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await createBooking();
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Navbar />
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size={12}>
          <RangePicker
            format="DD/MM/YYYY"
            onChange={(e, value) =>
              setCheckAvailability({
                ...checkAvailability,
                checkInDate: e?.[0],
                checkOutDate: e?.[1],
              })
            }
          />

          <Button onClick={checkRoomAvailability}>Check Availability</Button>
        </Space>
      </Modal>
      {rooms?.length
        ? rooms.map((x) => {
            return (
              <Card
                style={{
                  width: "50vw",
                  margin: "10px 10px",
                }}
                actions={[
                  <Button
                    onClick={() => {
                      showModal();
                      setCheckAvailability({
                        ...checkAvailability,
                        roomId: x?._id,
                      });
                    }}
                    icon={<HomeOutlined />}
                  >
                    Book Rooms
                  </Button>,
                ]}
              >
                <Meta
                  title={
                    <div className="flex justify-between">
                      <p>{x?.roomName}</p>
                      <p>₹{x?.rentAmountPerDay}/Day </p>
                    </div>
                  }
                  description={
                    <div>
                      <Space>
                        {x?.photos?.length
                          ? x?.photos.map((y) => {
                              return (
                                <Image
                                  width={300}
                                  height={250}
                                  className="object-cover px-1"
                                  src={y}
                                />
                              );
                            })
                          : ""}
                      </Space>
                      <Card>
                        <Meta
                          title="Facilities"
                          description={
                            <div>
                              {x?.amenities?.length
                                ? x?.amenities.map((y) => {
                                    return <Tag color="success">{y}</Tag>;
                                  })
                                : ""}
                            </div>
                          }
                        />
                      </Card>
                      <p className="flex items-center gap-2">
                        <LiaBedSolid />
                        {x?.numberOfBeds}
                      </p>
                      <p className="flex items-center gap-2">
                        <img
                          src="https://png.pngtree.com/png-vector/20191016/ourlarge/pngtree-house-size-height-and-width-vector-thin-line-icon-png-image_1803967.jpg"
                          className="w-[14px] h-[14px]"
                          alt=""
                        />
                        {x?.floorSize}sq.ft
                      </p>
                    </div>
                  }
                />
              </Card>
            );
          })
        : ""}
    </div>
  );
};

export default PropertyDetails;
