import { Button, Dropdown, Table, Typography, Popconfirm, Tag, Modal, Form, Input, Select } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const role = localStorage.getItem("role")

  const [form] = Form.useForm();

  // GET ORDERS

  const getOrders = () => {

    setProcessing(true)

    const token = localStorage.getItem("jwt")
    const role = localStorage.getItem("role")

    const url =
  role === "superAdmin"
    ? `${import.meta.env.VITE_API_URL}/order/all`
    : `${import.meta.env.VITE_API_URL}/order/my-orders`;

    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setOrders(res.data.orders)
      })
      .catch((error) => {
        console.error(error)
        window.toastify("Something went wrong", "error")
      })
      .finally(() => {
        setProcessing(false)
      })
  }
  useEffect(() => {

    getOrders();

  }, []);

  // DELETE

  const handleDelete = (order) => {

    setProcessing(true);

    const token = localStorage.getItem("jwt");

    axios.delete(`${import.meta.env.VITE_API_URL}/order/delete/${order.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {

        if (res.status === 200) {
          window.toastify(res.data.message, "success");

          setOrders(orders.filter(doc => doc.id !== order.id));

        }

      })

      .catch(error => {

        console.error(error);

        window.toastify("Something went wrong", "error");

      })

      .finally(() => setProcessing(false));

  };

  // EDIT

  const handleEdit = record => {

    setEditOrder(record);

    form.setFieldsValue({

      shippingAddress: record.shippingAddress,

      status: record.status,

      paymentStatus: record.paymentStatus

    });

    setModalOpen(true);

  };

  // UPDATE

  const handleUpdate = values => {

    setProcessing(true);

    const token = localStorage.getItem("jwt");

    axios.patch(
      `${import.meta.env.VITE_API_URL}/order/update/${editOrder.id}`,
      values,
      { headers: { Authorization: `Bearer ${token}` }, })
      .then(res => {

        if (res.status === 200) { window.toastify(res.data.message, "success"); setModalOpen(false); getOrders(); }
      })

      .catch(error => {

        console.error(error);
        window.toastify("Something went wrong", "error");
      })

      .finally(() => setProcessing(false));

  };

  const columns = [
    {
      title: "Products",
      render: (_, record) => (
        <>
          {record.products.map((item) => (
            <div key={item.productId} className="product-box" >
              <img src={item.image} alt={item.name} className="product-image" />

              <div>
                <div><b>{item.name}</b></div>
                <div>Price: Rs. {item.price}</div>
                <div>Qty: {item.quantity}</div>
              </div>
            </div>
          ))}
        </>
      ),
    },
    { title: "Order ID", dataIndex: "id", },
    {
      title: "Products", render: (_, record) => (
        <>
          {record.products.map((item) => (
            <div key={item.productId}>
              {item.name} × {item.quantity}
            </div>
          ))}
        </>
      ),
    },
    { title: "Total", dataIndex: "totalPrice", render: (price) => `Rs. ${price}`, },
    {
      title: "Shipping Address", dataIndex: "shippingAddress",
    },
    { title: "Order Status", dataIndex: "status", render: (status) => (<Tag color="blue"> {status} </Tag>), },
    { title: "Payment", dataIndex: "paymentStatus", render: (status) => (<Tag color={status === "Paid" ? "green" : "orange"}> {status} </Tag>), },
    { title: "Created", dataIndex: "createdAt", render: (date) => dayjs(date).format("DD-MMM-YYYY"), },

    ...(role === "superAdmin"
      ? [{
        title: "Action",
        render: (_, record) => (
          <Dropdown
            menu={{
              items: [
                { label: "Edit", key: "edit", onClick: () => handleEdit(record), },
                { label: (<Popconfirm title="Delete Order?" onConfirm={() => handleDelete(record)} > Delete</Popconfirm>), key: "delete", danger: true, },
              ],
            }}
          >
            <Button>Action</Button>
          </Dropdown>
        ),
      }]
      : []),
  ];

  return (

    <>

      <div className="orders-page">

        <div className="container">

          <Title className="page-title"> My Orders</Title>

          <div className="orders-table">

            <Table columns={columns} dataSource={orders} loading={processing} rowKey="id" scroll={{ x: 900 }} pagination={{ pageSize: 5, showSizeChanger: false, }} />

          </div>

        </div>

      </div>

      <Modal title="Edit Order" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} >

        <Form form={form} layout="vertical" onFinish={handleUpdate} >

          <Form.Item label="Shipping Address" name="shippingAddress" >

            <TextArea rows={1} />

          </Form.Item>

          <Form.Item label="Order Status" name="status" >

            <Select>

              <Option value="Pending">Pending</Option>

              <Option value="Processing">Processing</Option>

              <Option value="Shipped">Shipped</Option>

              <Option value="Delivered">Delivered</Option>

              <Option value="Cancelled">Cancelled</Option>

            </Select>

          </Form.Item>

          <Form.Item label="Payment Status" name="paymentStatus" >

            <Select>

              <Option value="Pending">Pending</Option>

              <Option value="Paid">Paid</Option>

              <Option value="Faild">Faild</Option>

            </Select>

          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={processing} > Update Order </Button>

        </Form>

      </Modal>

    </>

  );

};

export default Orders;