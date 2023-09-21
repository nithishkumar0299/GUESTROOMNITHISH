//owner created room list
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar, Button, Card, Image } from "antd";
const MyHotels = () => {
  const [property, setProperty] = useState([]);
  const { Meta } = Card;

  const user = localStorage.getItem("id") || "650b3304da3dd50b770a46f8";
  const getByPropertyOfOwner = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/property/getPropertyByOwner/${id}`
      );
      const property = response?.data;
      if (property && property?.length) {
        setProperty(property);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getByPropertyOfOwner(user);
  }, []);

  return (
    <div>
      {property?.length
        ? property.map((x) => {
            return (
              <Card
                style={{
                  width: 300,
                }}
                cover={
                  <Image
                    width={300}
                    height={300}
                    className="object-cover"
                    src={x?.roomImage}
                  />
                }
              >
                <Meta
                  title={x?.propertyName}
                  description={`${x?.streetAddress}, ${x?.city}, ${x?.state}`}
                />
              </Card>
            );
          })
        : ""}
    </div>
  );
};

export default MyHotels;
