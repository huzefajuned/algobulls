// ProfileUpdateForm.js
import { Form, Input, Upload, Button, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Handle form submission logic here
    console.log("Received values:", values);
  };



  return (
    <div className="flex justify-center items-center h-full">
      <Form
        form={form}
        name="profile_update"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="bg-white p-10 w-1/2 h-1/2 rounded shadow-md"
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input className="w-full" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input className="w-full" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item name="image" label=" Upload Image">
          <Upload type="select">
            <Button>Select Image</Button>
          </Upload>
        </Form.Item>

        {/* Date of Creation */}
        <Form.Item
          label="Date of Creation"
          name="creationDate"
          rules={[
            { required: true, message: "Please select the date of creation!" },
          ]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Add more fields as needed */}

        {/* Submit Button */}
        <Form.Item className="mt-4">
          <Button
            type="default"
            htmlType="submit"
            className="w-full bg-blue-500 text-white hover:text-blue-700 hover:bg-white"
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
