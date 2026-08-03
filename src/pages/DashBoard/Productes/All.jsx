import { Button, Dropdown, Table, Typography, Popconfirm, Tag, Modal, Form, Input, InputNumber, Select } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const All = () => {
  const [products, setProducts] = useState([])
  const [processing, setProcessing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [image, setImage] = useState(null)
  const [form] = Form.useForm()

  const getProducts = () => {
    setProcessing(true);

    const token = localStorage.getItem("jwt");

    axios.get(`${import.meta.env.VITE_API_URL}/products/all`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
          window.toastify(res.data.message, "success"); 
        } else {
          window.toastify(res.data.message, "error");
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong", "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // DELETE

  const handleDelete = (product) => {
    setProcessing(true);

    const token = localStorage.getItem("jwt");

    axios.delete(`${import.meta.env.VITE_API_URL}/products/delete/${product.id}`, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => {
        if (res.status === 200) {
          window.toastify(res.data.message, "success");
          const filterProducts = products.filter((doc) => doc.id !== product.id);
          setProducts(filterProducts);
        }
        else { window.toastify(res.data.message, "error"); }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Something went wrong", "error");
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  // EDIT CODE HERE


  const handleEdit = (record) => {

    setEditProduct(record)
    setImage(null)

    form.setFieldsValue({
      name: record.name,
      price: record.price,
      stock: record.stock,
      category: record.category,
      description: record.description
    })

    setModalOpen(true)

  }


  // UPDATE CODE HERE

  const handleUpdate = (values) => {

    setProcessing(true)

    const token = localStorage.getItem("jwt")

    const formData = new FormData()

    for (const key in values) {
      formData.append(key, values[key])
    }

    if (image) {
      formData.append("image", image)
    }

    axios.patch(`${import.meta.env.VITE_API_URL}/products/update/${editProduct.id}`, formData, { headers: { Authorization: `Bearer ${token}`, } })
      .then((res) => {
        if (res.status === 200) {
          window.toastify(res.data.message, "success")
          setModalOpen(false)

          getProducts()

        }
      })
      .catch(error => {
        console.error(error)
        window.toastify("Something went wrong", "error")
      })
      .finally(() => {
        setProcessing(false)
      })

  }


  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (image) =>
        image ? (<img src={image} width={60} height={60} style={{ borderRadius: "5px", objectFit: "cover" }} />
        ) : (<></>),
    },

    { title: "Name", dataIndex: "name", },

    { title: "Price", dataIndex: "price", render: (price) => `Rs. ${price}`, },

    { title: "Stock", dataIndex: "stock", },

    { title: "Category", dataIndex: "category", render: (category) => <Tag color="blue">{category}</Tag>, },

    { title: "Description", dataIndex: "description", },

    {
      title: "Created", dataIndex: "createdAt", render: (date) => dayjs(date).format("DD-MMM-YYYY"),

    },
    {
      title: "Action",
      render: (_, record) => (
        <Dropdown menu={{
          items: [
            { label: "Edit", key: "edit", onClick: () => handleEdit(record) },
            { label: <Popconfirm title="Delete Product?" onConfirm={() => handleDelete(record)}>Delete</Popconfirm>, key: "delete", danger: true }
          ]
        }}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      )
    }

  ];

  return (
    <>
      <div className="container py-4">

       <div className="d-flex justify-content-between align-items-center ">
         <Title className="text-center mb-3"> Products </Title>
         <Link to='add' className="btn btn-primary" >Add Product</Link>
       </div>

        <Table columns={columns} dataSource={products} loading={processing} rowKey="id" pagination={{ pageSize: 5 }} />
      </div>

      <Modal title="Edit Product" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} >

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >

          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber className="w-100" />
          </Form.Item>

          <Form.Item label="Stock" name="stock">
            <InputNumber className="w-100" />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Option value="Mobile">Mobile</Option>
              <Option value="Laptop">Laptop</Option>
              <Option value="Accessories">Accessories</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={1} />
          </Form.Item>

          <Form.Item label="Image"> 
            <input   type="file" className="form-control"  accept="image/*"  onChange={e => setImage(e.target.files[0])} />
          </Form.Item>

          <Button type="primary"  htmlType="submit"  block  loading={processing} >Update Product </Button>

        </Form>

      </Modal>
    </>
  );
};

export default All;