//owner functionality and show page
import React from "react";
import { Tabs } from "antd";
import CreateHotels from "./CreateHotels";
import MyHotels from "./MyHotels";
import Navbar from "../Navbar";

const onChange = (key) => {
  console.log(key);
};

const Owners = () => {
  return (
    <div>
      <Navbar />
      <Tabs
        onChange={onChange}
        type="card"
        items={[
          {
            label: `My Properties`,
            key: 1,
            children: <MyHotels />,
          },
          {
            label: `Add Property`,
            key: 2,

            children: <CreateHotels />,
          },
        ]}
      />
    </div>
  );
};

export default Owners;
