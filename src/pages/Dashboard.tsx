import React, { useEffect, useState } from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";
import Likes from "../components/Likes";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { logoutUser } from "../AppContainer/MainApp";
import CreatePost from "../components/CreatePost";

const { Header, Content, Sider } = Layout;

const AvatarImg: string =
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
// Add other components (Item3, Item4, etc.) as needed

const Dashboard: React.FC = () => {
  var timeout = 5000;
  const [selectedKey, setSelectedKey] = useState("1"); // Default selected key
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: any;

    if (!currentUser) {
      intervalId = setInterval(() => {
        toast.info("You are not logged in! Please log in.");

        setTimeout(() => {
          navigate("/login");
        }, 10000);
      }, timeout);
    }

    // Cleanup the interval when the component is unmounted or when the user logs in
    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser, timeout]);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

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
      label: "Likes",
      component: Likes,
    },
  ];

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <Layout className="p-10 h-screen w-screen ">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
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
      <Layout className=" rounded-md">
        <Header className=" flex flex-row justify-between items-center">
          <h2>test</h2>
          <Avatar src={AvatarImg} />
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
