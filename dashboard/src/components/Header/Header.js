import classes from "./Header.module.css";
import React from "react";
import { Input, Card, Avatar, Badge } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
const { Meta } = Card;

const Header = () => {
  return (
    <div className={classes.header}>
      <Input
        size='large'
        placeholder='Search for Something...'
        prefix={<SearchOutlined style={{ color: "gray" }} />}
        bordered={false}
      />
      <div className={classes.notification}>
        <BellOutlined
          style={{
            fontSize: "25px",
            color: "gray",
            padding: "11px 0 0 0",
            cursor: "pointer",
          }}
        />

        <div className={classes.badge}>
          {" "}
          <Badge count={5} color='blue'></Badge>
        </div>
      </div>
      <div>
        <Card
          style={{ width: 250, height: "5vh", padding: "0 10px" }}
          loading={""}
          bordered={false}
          size='small'>
          <Meta
            avatar={
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            }
            title='John Doe'
            className={classes.userInfo}
          />
        </Card>
      </div>
    </div>
  );
};

export default Header;
