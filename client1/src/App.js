//it were connect all components at single components
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, Card, Image } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const App = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const getProperty = async () => {
    await axios
      .get("http://localhost:5000/api/v1/property/getAllProperty")
      .then((res) => {
        console.log(res.data);
        const propertyData = res?.data;
        if (propertyData && propertyData?.length) {
          const convertedRoomsData = convertGoogleDriveUrls(propertyData);
          if (convertedRoomsData && convertedRoomsData?.length) {
            setProperty(convertedRoomsData);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  function convertGoogleDriveUrls(data) {
    const convertedData = [...data]; // Create a copy of the data to avoid mutating the original data

    for (const item of convertedData) {
      const originalUrl = item?.image;
      if (originalUrl?.includes("drive.google.com")) {
        const parts = originalUrl?.split("/");
        const file_id = parts[parts.length - 2];
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${file_id}`;
        item.image = convertedUrl;
      }
    }

    return convertedData; // Return the modified data
  }
  useEffect(() => {
    getProperty();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-3 py-3">
        <div className="grid grid-cols-4">
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
                    actions={[
                      <Button
                        icon={<HomeOutlined />}
                        onClick={() => navigate(`/property/${x?._id}`)}
                      >
                        Check Available Rooms
                      </Button>,
                    ]}
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
      </div>
    </div>
  );
};

export default App;
