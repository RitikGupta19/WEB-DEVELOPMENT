import React from "react";
import { Row, Col } from "antd";
import Card from "./Card";

const CardList = () => {
  return (
    <Row gutter={[32, 24]}>
      <Col xs={22} sm={22} md={22} lg={8} xl={8} xxl={8}>
        <Card title={"New Drafts"} />
      </Col>
      <Col xs={22} sm={22} md={22} lg={8} xl={8} xxl={8}>
        <Card title={"Discussions"} />
      </Col>
      <Col xs={22} sm={22} md={22} lg={8} xl={8} xxl={8}>
        <Card title={"Top Referals"} />
      </Col>
    </Row>
  );
};

export default CardList;
