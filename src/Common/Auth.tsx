import { Form, Input, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Auth = ({ title, image, onFinish, loading }: any) => {
  const navigate = useNavigate();
  console.log("loading", loading);
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg  p-2 rounded-xl flex flex-col md:flex-row justify-between  w-[90%] items-center">
          <Image
            preview={false}
            src={image}
            width={800}
            height={800}
            className="md:w-1/2 lg:w-1/2 shadow-lg rounded-lg"
          />
          <Form
            onFinish={onFinish}
            initialValues={{ autoLogin: true }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            title={title}
            className=" w-full md:w-1/2 lg:w-1/2 p-4 flex flex-col gap-5"
          >
            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" ghost htmlType="submit">
                {title}
              </Button>
              {title == "Login" && (
                <Button
                  type="link"
                  ghost
                  className="bg-blue-300 float-right"
                  onClick={() => navigate("/signup")}
                >
                  Create a new Account?
                </Button>
              )}
              {title == "SignUp" && (
                <Button
                  type="link"
                  ghost
                  className="bg-blue-300 float-right"
                  onClick={() => navigate("/login")}
                >
                  Login to Account?
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>

      {loading && <Loading />}
    </>
  );
};

export default Auth;
