import { Col, Layout, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllNews } from "./api";
import { newsSelector } from "./selector";

const News = () => {
  const dispatch = useDispatch();

  const news = useSelector(newsSelector);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <Layout
      style={{
        margin: "auto",
        maxWidth: "80%",
      }}
    >
      {news.map((n) => (
        <Row gutter={[24, 24]} key={n._id}>
          <Col span={8}>
            <img
              alt="news"
              src={n.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col span={16}>
            <Typography.Title level={3}>{n.title}</Typography.Title>
            <Typography.Text>{n.description}</Typography.Text>
          </Col>
        </Row>
      ))}
    </Layout>
  );
};

export default News;
