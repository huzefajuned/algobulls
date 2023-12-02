import signupImg from "../Images/signup.jpeg";

import Auth from "../Common/Auth";

const SignUp = ({ onSubmit, loading }: any) => {
  const title = "SignUp";
  const onFinish = (values: any) => {
    onSubmit({ ...values, title });
  };

  return (
    <Auth
      title={title}
      image={signupImg}
      onFinish={onFinish}
      loading={loading}
    />
  );
};

export default SignUp;
