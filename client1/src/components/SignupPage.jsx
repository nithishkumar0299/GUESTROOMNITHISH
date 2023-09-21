//it contain signup page setup
import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
    password: "",
  });

  const onFinish = () => {
    console.log("Form Data:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addUser = async () => {
    await axios
      .post("http://localhost:5000/api/v1/user/createUser", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8">
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
          name="signup-form"
          onFinish={onFinish}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="firstName"
              value={formData.userName}
              onChange={handleInputChange}
              //   className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="lastName"
              value={formData.userName}
              onChange={handleInputChange}
              //   className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              //   className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              //   className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="User Type"
            rules={[
              { required: true, message: "Please select your user type!" },
            ]}
          >
            <Select
              name="role"
              value={formData.userType}
              onChange={(value) => setFormData({ ...formData, role: value })}
              //   className="w-full"
              placeholder="Select user type"
            >
              <Option value="Customer">Customer</Option>
              <Option value="HouseOwner">Owner</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password name="password" onChange={handleInputChange} />
          </Form.Item>

          <Form.Item>
            <Button color="secondary" htmlType="submit" onClick={addUser}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
