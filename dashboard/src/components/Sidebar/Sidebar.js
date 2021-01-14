import React from "react";
import { Link } from "react-router-dom";

import classes from "./Sidebar.module.css";
import { Menu } from "antd";
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

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        {" "}
        <DatabaseOutlined
          style={{ color: "#1890ff", fontSize: "25px", padding: "8px 10px" }}
        />
        <p style={{ color: "#1890ff" }} exact to='/'>
          {" "}
          Shards Dashboard
        </p>
      </div>
      <Menu
        mode='inline'
        defaultSelectedKeys={["1"]}
        style={{ fontSize: "18px" }}>
        <Menu.Item key='1' icon={<EditOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/'>
            {" "}
            Blog Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item
          key='2'
          icon={<FileTextOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/blogPosts'>
            {" "}
            Blog Posts
          </Link>
        </Menu.Item>
        <Menu.Item
          key='3'
          icon={<FileAddOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/addPost'>
            {" "}
            Add New Post
          </Link>
        </Menu.Item>
        <Menu.Item
          key='4'
          icon={<FileSearchOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/formComponents'>
            {" "}
            Forms & Components
          </Link>
        </Menu.Item>
        <Menu.Item
          key='5'
          icon={<TableOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/tables'>
            {" "}
            Tables
          </Link>
        </Menu.Item>
        <Menu.Item key='6' icon={<UserOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/userProfile'>
            {" "}
            User Profile
          </Link>
        </Menu.Item>
        <Menu.Item
          key='7'
          icon={<CloseCircleOutlined style={{ fontSize: "20px" }} />}>
          <Link exact to='/errors'>
            {" "}
            Errors
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
