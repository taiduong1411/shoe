import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import * as OrderServices from "../../services/OrderServices";
import { useSelector } from "react-redux";
import { WrapperHeader } from "../AdminUser/style";
import TableComponent from "../TableComponent/TableComponent";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import { Button, Space } from "antd";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { convertPrice } from "../../utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
const Report = () => {
  const [rowSelected, setRowSelected] = useState("");
  const user = useSelector((state) => state.user);
  const getAllOrder = async () => {
    const res = await OrderServices.report(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });

  const { isPending: isPendingOrders, data: orders } = queryOrder;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          //   ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          //   onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const BarChartComponent = ({ data }) => {
    return (
      <BarChart width={400} height={200} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="totalOrders"
          fill="#8884d8"
          name="Total Orders"
          stackId="stack"
        />
        <Bar
          dataKey="totalRevenue"
          fill="#82ca9d"
          name="Total Revenue"
          stackId="stack"
        />
      </BarChart>
    );
  };


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      ...getColumnSearchProps("totalOrders"),
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      ...getColumnSearchProps("totalRevenue"),
    },
  ];

  const dataTable =
    queryOrder?.data?.length &&
    queryOrder?.data?.map((order) => {
      return {
        ...order,
        key: order._id.date,
        totalRevenue: convertPrice(order?.totalRevenue),
      };
    });
  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ width: "400px", height: "200px" }}>
        <BarChartComponent data={dataTable} />
      </div>
      <div style={{ width: "200px", height: "200px" }}>
        {/* <PieChartComponent data ={orders?.data} /> */}
      </div>
      <div style={{  }}>
        <TableComponent
          columns={columns}
          isPending={isPendingOrders}
          data={dataTable}
        />
      </div>
    </div>
  );
};

export default Report;
