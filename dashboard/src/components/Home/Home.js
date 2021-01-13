import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Row, Col } from "antd";
import Routes from "../../Routes";
import Header from "../Header/Header";

const Home = () => {
  return (
    <Row>
      <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>
        <Sidebar />
      </Col>
      <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
        <Header />
      </Col>
    </Row>
  );
};

export default Home;
