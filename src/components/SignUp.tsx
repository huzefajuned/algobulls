import React from "react";

import { Form, Checkbox, Input, Button } from "antd";

const SignUp = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <Form
        onFinish={onFinish}
        initialValues={{ autoLogin: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: true, message: "Please input your mobile!" }]}
        >
          <Input placeholder="Mobile" />
        </Form.Item>

        <Form.Item
          label="Captcha"
          name="captcha"
          rules={[{ required: true, message: "Please input the captcha!" }]}
        >
          <Input placeholder="Captcha" />
        </Form.Item>

        <Form.Item
          name="autoLogin"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Keep me logged in</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div>
            Other login methods
            {/* Add your icons here */}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
