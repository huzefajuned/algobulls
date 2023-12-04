import React, { useEffect, useState } from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";
import Likes from "../components/Likes";
import { logoutUser } from "../AppContainer/MainApp";
import CreatePost from "../components/CreatePost";
import MyPosts from "../components/MyPosts";
import useCurrentUser from "../hooks/useCurrentUser";

const { Header, Content, Sider } = Layout;

const AvatarImg: string =
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
// Add other components (Item3, Item4, etc.) as needed

const Dashboard: React.FC = () => {
  const [timeout, setTimeout] = useState(10000);
  const [selectedKey, setSelectedKey] = useState("1"); // Default selected key
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: any;

    if (!currentUser) {
      intervalId = setInterval(() => {
        message.info("You are not logged in! Please log in.");
        setTimeout((prev) => prev + 10000);
      }, timeout);
    }

    // Cleanup the interval when the component is unmounted or when the user logs in
    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser, timeout]);

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Posts",
      component: Posts,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "CreatePost",
      component: CreatePost,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: "Profile",
      component: Profile,
    },

    {
      key: "4",
      icon: <VideoCameraOutlined />,
      label: "Bookmarks",
      component: Bookmarks,
    },
    {
      key: "5",
      icon: <VideoCameraOutlined />,
      label: "MyPosts",
      component: MyPosts,
    },
    {
      key: "6",
      icon: <VideoCameraOutlined />,
      label: "Likes",
      component: Likes,
    },
  ];

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <Layout className="p-5  h-screen w-screen bg-white  ">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          className=" h-full"
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.key)}
              disabled={currentUser == null}
            >
              <span>{item.label}</span>
            </Menu.Item>
          ))}

          <div className="bg-blue-500 absolute bottom-0 w-full flex flex-row justify-center p-2">
            {!currentUser ? (
              <Button
                type="primary"
                className="bg-blue-500"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-red-500"
                onClick={() => logoutUser()}
              >
                Logout
              </Button>
            )}
          </div>
        </Menu>
      </Sider>
      <Layout className="">
        <Header className=" flex flex-row justify-end items-center">
          <Avatar src={AvatarImg} size={50} />
        </Header>
        <Content className="bg-bl">
          <div className=" h-full">
            {menuItems.map(
              (item) =>
                item.key === selectedKey && <item.component key={item.key} />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
