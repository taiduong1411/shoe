import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "antd";
import { WrapperHeader } from "../AdminProduct/style";
import { contactSelector } from "../../pages/Contact/selector";
import { fetchAllContacts } from "../../pages/Contact/api";

const AdminContact = () => {
  const dispatch = useDispatch();

  const data = useSelector(contactSelector);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
    },
  ];

  return (
    <>
      <WrapperHeader level={2}>Danh Sách Liên Hệ</WrapperHeader>
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default AdminContact;
