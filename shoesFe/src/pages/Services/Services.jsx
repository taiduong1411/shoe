import { Col, Layout, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllServices } from "./api";
import { servicesSelector } from "./selector";

const Services = () => {
  const dispatch = useDispatch();

  const services = useSelector(servicesSelector);

  console.log(services);

  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  return (
    <Layout style={{ margin: "auto", maxWidth: "80%" }}>
      {services?.map((service) => (
        <Row
          gutter={[24, 24]}
          key={service._id}
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
                alt={service.title}
                src={service.image}
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
            <Typography.Title level={3} style={{ marginBottom: "8px" }}>
              {service.title}
            </Typography.Title>
            <Typography.Text style={{ marginBottom: "8px", display: "block" }}>
              {service.description}
            </Typography.Text>
            <Typography.Text style={{ marginBottom: "8px", display: "block" }}>
              Giá: {service.price} VNĐ
            </Typography.Text>
            <Typography.Text style={{ marginBottom: "8px", display: "block" }}>
              Thời Gian Hoàn Thành: {service.completionTime} ngày
            </Typography.Text>
            <Typography.Text style={{ marginBottom: "8px", display: "block" }}>
              Liên Hệ: {service.contact}
            </Typography.Text>
            <Typography.Text type="secondary">
              Địa Chỉ: {service.address}
            </Typography.Text>
          </Col>
        </Row>
      ))}
    </Layout>
  );
};

export default Services;
