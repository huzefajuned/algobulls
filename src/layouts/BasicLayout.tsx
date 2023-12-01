// src/layouts/BasicLayout.js

import React from "react";
import ProLayout, { MenuDataItem } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
// import "@ant-design/pro-layout/dist/layout.css";

const menuData: MenuDataItem[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
  },
  {
    path: "/users",
    name: "Users",
    icon: "user",
  },
  // Add more menu items as needed
];

const getMenuData = (routes: MenuDataItem[]): MenuDataItem[] => {
  return routes.map((item) => {
    const result = { ...item };
    if (item.routes) {
      result.routes = getMenuData(item.routes);
    }
    return result;
  });
};

const BasicLayout: React.FC = (props) => {
  const routeData = getMenuData(menuData);
  return (
    <ProLayout menuDataRender={() => routeData} {...props}>
      {props.children}
    </ProLayout>
  );
};

export default BasicLayout;
