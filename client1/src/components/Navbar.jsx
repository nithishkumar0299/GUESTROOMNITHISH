//it's contain detail on navigation bar
import { Avatar, Popover, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let customerId = localStorage.getItem("id");
  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    await axios
      .get(`http://localhost:5000/api/v1/user/profile/${customerId}`)
      .then((res) => {
        setProfile(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (customerId) {
      getProfile();
    }
  }, [customerId]);
  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-purple-500 px-8">
      <Link to={`/`} state={{ data: "Hello" }}>        <div>GuestRoom</div>
        </Link>
        <div className="flex items-center justify-between gap-4 text-white">
          <div>
            {" "}
            <Link to={`/`} state={{ data: "Hello" }}>
              Home
            </Link>
          </div>

          {customerId ? (
            <>
              {profile?.role === "HouseOwner" ||
              profile?.role === "SuperAdmin" ? (
                <>
                  <div>
                    <Link to={`/createProperty`} state={{ data: "Hello" }}>
                      Owner
                    </Link>
                  </div>
                  <div>
                    <Link to={`/myBookings`} state={{ data: "Hello" }}>
                      Manage Bookings
                    </Link>
                  </div>
                </>
              ) : (
                ""
              )}
              {profile?.role === "Customer" ||
              profile?.role === "SuperAdmin" ? (
                <div>
                  <Link to={"/myBookings"}>My Bookings</Link>
                </div>
              ) : (
                ""
              )}
              {profile ? (
                <div>
                  <Popover
                    placement="bottomRight"
                    arrow={false}
                    content={
                      <div>
                        <Link
                          to={"/"}
                          onClick={() => localStorage.removeItem("id")}
                        >
                          Log Out
                        </Link>
                      </div>
                    }
                    trigger="click"
                  >
                    <Space>
                      <Avatar>
                        {profile?.firstName?.[0]}
                        {profile?.lastName?.[0]}
                      </Avatar>
                      {profile?.firstName}
                    </Space>
                  </Popover>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div>
                <Link to={"/login"}>Login</Link>
              </div>
              <div>
                <Link to={"/signUp"}>Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
