import React from "react";
import { Link } from "react-router-dom";

import classes from "./Sidebar.module.css";
import { Layout, Menu } from "antd";
import {
  CloseCircleOutlined,
  UserOutlined,
  TableOutlined,
  DatabaseOutlined,
  EditOutlined,
  FileTextOutlined,
  FileAddOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      className={classes.slider}
      style={{
        position: "fixed",
        height: "100vh",
        zIndex: "1",
      }}>
      <div className={classes.logo}>
        {" "}
        <DatabaseOutlined
          style={{ color: "white", fontSize: "20px", padding: "5px 10px" }}
        />
        <Link style={{ color: "white" }} exact to='/'>
          {" "}
          Dashboard
        </Link>
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
        <Menu.Item key='1' icon={<EditOutlined />}>
          <Link exact to='/'>
            {" "}
            Blog Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<FileTextOutlined />}>
          <Link exact to='/blogPosts'>
            {" "}
            Blog Posts
          </Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<FileAddOutlined />}>
          <Link exact to='/addPost'>
            {" "}
            Add New Post
          </Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<FileSearchOutlined />}>
          <Link exact to='/formComponents'>
            {" "}
            Forms & Components
          </Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<TableOutlined />}>
          <Link exact to='/tables'>
            {" "}
            Tables
          </Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<UserOutlined />}>
          <Link exact to='/userProfile'>
            {" "}
            User Profile
          </Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<CloseCircleOutlined />}>
          <Link exact to='/errors'>
            {" "}
            Errors
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
