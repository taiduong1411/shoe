import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";

import React from "react";
import { sendContact } from "./api";
import { useDispatch } from "react-redux";

const { Content } = Layout;
const { Title } = Typography;

const Contact = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Form values:", values);

    dispatch(sendContact(values));
  };

  return (
    <Layout style={{ margin: "auto", maxWidth: "80%" }}>
      <Content style={{ padding: "24px" }}>
        <Title level={2}>Liên Hệ</Title>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form name="contact-form" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Họ và Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số Điện Thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Nội dung"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung!",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Title level={3}>Thông Tin Liên Hệ</Title>
            <p>
              <strong>Địa Chỉ:</strong>02 Trường Sa,Quận Bình Thạnh, Thành Phố Hồ Chí Minh
            </p>
            <p>
              <strong>Điện Thoại:</strong> 0353955259
            </p>
            <p>
              <strong>Email:</strong> ShopFP@gmail.com
            </p>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Contact;
