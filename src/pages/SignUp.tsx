import signupImg from "../Images/signup.jpeg";

import Auth from "../Common/Auth";

const SignUp = ({ onSubmit }: any) => {
  const title = "SignUp";
  const onFinish = (values: any) => {
    onSubmit({ ...values, title });
  };

  return <Auth title={title} image={signupImg} onFinish={onFinish} />;
};

export default SignUp;
