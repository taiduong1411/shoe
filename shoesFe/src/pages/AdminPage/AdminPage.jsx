import {
  AppstoreOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import AdminContact from "../../components/AdminContact/AdminContact";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from "../../components/AdminUser/AdminUser";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { Menu } from "antd";
import { getItem } from "../../utils";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import Report from "../../components/AdminOrder/Report";
import Inventory from "../../components/AdminOrder/Inventory";

const AdminPage = () => {
  const items = [
    getItem("Người Dùng", "user", <UserOutlined />),
    getItem("Sản Phẩm", "product", <AppstoreOutlined />),
    getItem("Liên hệ", "contact", <ContactsOutlined />),
    getItem("Đơn hàng", "order", <ShoppingOutlined />),
    getItem("Doanh thu", "report", <ShoppingOutlined />),
    getItem("Tồn kho", "inventory", <ShoppingOutlined />),
  ];
  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "contact":
        return <AdminContact />;
      case "order":
        return <AdminOrder />;
      case "report":
        return <Report />;
      case "inventory":
        return <Inventory />;
      default:
        return <AdminUser />;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenMenu />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};
export default AdminPage;
