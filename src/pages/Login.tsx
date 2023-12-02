import loginImg from "../Images/login.jpeg";

import Auth from "../Common/Auth";

const Login = ({ onSubmit, loading }: any) => {
  const title = "Login";
  const onFinish = (values: any) => {
    onSubmit({ ...values, title });
  };

  return (
    <Auth
      title={title}
      image={loginImg}
      onFinish={onFinish}
      loading={loading}
    />
  );
};

export default Login;
