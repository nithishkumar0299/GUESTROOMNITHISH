//owner login page setup
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Add custom validation logic here
    if (!formData.email || !formData.password) {
      message.error("Please fill in all fields.");
      return;
    }

    // Add your login logic here, such as making an API request
    // with the formData
    console.log("Form data submitted:", formData);
  };

  const login = async () => {
    await axios
      .post("http://localhost:5000/api/v1/user/login", formData)
      .then((res) => {
        console.log(res);
        message.success("Login Success");
        localStorage.setItem("id", res?.data?.user?._id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        message.error("Username/Password Incorrect");
      });
  };

  return (
    <div className="bg-[url('https://images-cdn.welcomesoftware.com/Zz1hMjM1NWFhMjhlNDYxMWViODc0MWQzYzBkNTFlNDU4ZA==')] bg-cover h-[100vh] py-[5vh]">
      <div className="flex  bg-[rgba(255,255,255,0.5)] px-10 py-10 h-[90vh] w-[90vw] mx-auto">
        <div className="w-[40%] bg-[white] px-3 py-3 h-[75vh]">
          <h2 className="text-2xl py-2 font-semibold text-[#CF2775]">Login</h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: true ? "Please Enter Your Email!" : "",
                },
                {
                  type: "email",
                  message: true ? "Invalid Email Address Format." : "",
                },
                {
                  message: "hey",
                },
              ]}
            >
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long.",
                },
              ]}
            >
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" onClick={login}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <p>
            <Link to="/signUp">
              <span className="text-[blue] underline">Forgot Password</span>
            </Link>{" "}
            &nbsp;
            <Link to="/signUp">
              <span className="text-[blue] underline">
                Sign Up For Booking App
              </span>
            </Link>
          </p>
        </div>
        <div className="w-[60%]">
          <img
            src="https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?w=2000"
            alt=""
            className="h-[75vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
