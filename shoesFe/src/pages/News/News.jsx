import { Col, Layout, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllNews } from "./api";
import moment from "moment";
import { newsSelector } from "./selector";

const News = () => {
  const dispatch = useDispatch();

  const news = useSelector(newsSelector);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <Layout style={{ margin: "auto", maxWidth: "80%" }}>
      {news.map((n) => (
        <Row
          gutter={[24, 24]}
          key={n._id}
          style={{
            paddingBottom: "16px",
            marginBottom: "16px",
          }}
        >
          <Col span={8}>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                padding: "8px",
                border: "1px solid #e8e8e8",
              }}
            >
              <img
                alt="news"
                src={n.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </Col>
          <Col span={16}>
            <Typography.Title level={3}>{n.title}</Typography.Title>
            <Typography.Text style={{ maxWidth: "80%" }}>
              {n.description}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginTop: "8px" }}
            >
              Created at: {moment(n.createdAt).format("MMMM Do YYYY, h:mm a")}
            </Typography.Text>
          </Col>
        </Row>
      ))}
    </Layout>
  );
};

export default News;
