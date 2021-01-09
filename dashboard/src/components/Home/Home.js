import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

const Home = () => {
  return (
    <Layout className={classes.layout}>
      <Sidebar />
      <Layout>
        <div>
          <Header
            className={classes.siteLayoutSubHeaderBackground}
            style={{ padding: 0 }}>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
          </Header>
        </div>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className={classes.siteLayoutBackground}
            style={{ padding: 24, minHeight: 360 }}>
            content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dashboard ©2021 Created using React + Antd
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
