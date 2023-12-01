import React from "react";

import { Form, Checkbox, Input, Button } from "antd";
import loginImg from "../Images/login.jpeg";

import Auth from "../Common/Auth";

const Login = ({ onSubmit }: any) => {
  const title = "Login";
  const onFinish = (values: any) => {
    onSubmit({ ...values, title });
  };

  return <Auth title={title} image={loginImg} onFinish={onFinish} />;
};

export default Login;
