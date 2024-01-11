import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import * as OrderServices from "../../services/OrderServices";
import { useSelector } from 'react-redux';
import { WrapperHeader } from '../AdminUser/style';
import TableComponent from '../TableComponent/TableComponent';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { Button, Space } from 'antd';
import { orderContant } from '../../contant';
import PieChartComponent from './PieChart';
import { convertPrice } from '../../utils';

const AdminOrder = () => {
    const [rowSelected, setRowSelected] = useState("");
    const user = useSelector((state) => state.user);
  const getAllOrder = async () => {
    const res = await OrderServices.getAllOrder(user?.access_token);
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


  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
      {
        title: "Paided",
        dataIndex: "isPaid",
        ...getColumnSearchProps("isPaid"),
      },
      {
        title: "shipped",
        dataIndex: "isDelivered",
        ...getColumnSearchProps("isDelivered"),
      },
      {
        title: "Payment Method",
        dataIndex: "paymentMethod",
        ...getColumnSearchProps("paymentMethod"),
      },
      {
        title: "Total Price",
        dataIndex: "totalPrice",
        ...getColumnSearchProps("totalPrice"),
      },
  ];


  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
       userName:order?.shippingAddress?.fullName,
       phone:order?.shippingAddress?.phone,
       address:order?.shippingAddress?.address,
       paymentMethod: orderContant.payment[order?.paymentMethod],
       isPaid:order?.isPaid ? 'TRUE' :'FALSE',
       isDelivered:order?.isDelivered ? 'TRUE' :'FALSE',
       totalPrice:convertPrice(order?.totalPrice)

      };
    });
  return (
    <div>
        <WrapperHeader>Quản lý thanh toán</WrapperHeader>
        <div style={{width:'200px',height:'200px'}}>
        <PieChartComponent data ={orders?.data} />
        </div>
        <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isPending={isPendingOrders}
          data={dataTable}
        />
      </div>
    </div>
  )
}

export default AdminOrder