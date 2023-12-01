import { SmileOutlined, PlaySquareOutlined } from "@ant-design/icons";
import ProLayout, { MenuDataItem } from "@ant-design/pro-layout";

const ROUTES: MenuDataItem[] = [
  {
    path: "/",
    name: "Welcome",
    icon: <SmileOutlined />,
    children: [
      {
        path: "/dashboard/posts",
        name: "posts",
        exact: true,
      },
      {
        path: "/dashboard/profile",
        name: "profile",
        exact: true,
      },
    ],
  },
  {
    path: "/example",
    name: "Example Page",
    icon: <PlaySquareOutlined />,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: <PlaySquareOutlined />,
  },
  {
    path: "/create-post",
    name: "Create Post",
    icon: <PlaySquareOutlined />,
  },
  {
    path: "/my-all-posts",
    name: "My All Posts",
    icon: <PlaySquareOutlined />,
  },
];

const Dashboard = ({ children }: any) => {
  return (
    <ProLayout route={() => ROUTES} className="bg-red-100 ">
      {" "}
      {children}
    </ProLayout>
  );
};

export default Dashboard;
