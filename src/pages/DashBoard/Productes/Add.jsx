import { Button, Col, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

const initialState = {
  name: "", price: "", stock: "", category: "", description: "",
};

const Add = () => {
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => { setState((s) => ({ ...s, [e.target.name]: e.target.value })) };

  const handleAddProduct = () => {
    const { name, price, stock, category, description } = state;

    if (name.trim().length < 3)
      return window.toastify("Please enter product name", "error");

    if (!price)
      return window.toastify("Please enter price", "error");

    if (!stock)
      return window.toastify("Please enter stock", "error");

    if (!category)
      return window.toastify("Please select category", "error");

    if (description.trim().length < 5)
      return window.toastify("Please enter description", "error");

    const product = { name, price, stock, category, description };

    const formData = new FormData();

    for (const key in product) {
      formData.append(key, product[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("jwt");

    axios.post(`${import.meta.env.VITE_API_URL}/products/create`, formData, { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => {
        if (res.status === 201) {
          window.toastify(res.data.message, "success");
          navigate("/dashboard/products");
        }
      })
      .catch((error) => {
        console.error(error);
        window.toastify("Product not created", "error");
      });
  };

  return (
    <main className="auth-products flex-center-product">
      <div className="container">
        <div className="card product-card w-60 p-2 mx-auto">
          <Row>
            <Col span={24}>
              <Title className="text-center" level={2} >Add Product</Title>

              <Form layout="vertical">

                <Item label="Product Name">
                  <Input size="large" name="name" placeholder="Enter product name" onChange={handleChange} />
                </Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Item label="Price">
                      <InputNumber size="large" className="w-100" placeholder="Enter price" onChange={(value) => setState(s => ({ ...s, price: value }))} />
                    </Item>
                  </Col>

                  <Col span={12}>
                    <Item label="Stock">
                      <InputNumber size="large" className="w-100" placeholder="Enter stock" onChange={(value) => setState(s => ({ ...s, stock: value }))} />
                    </Item>
                  </Col>
                </Row>

                <Item label="Category">
                  <Select size="large" placeholder="Select Category" onChange={(value) => setState(s => ({ ...s, category: value }))}>
                    <Option value="Mobile">Mobile</Option>
                    <Option value="Laptop">Laptop</Option>
                    <Option value="Accessories">Accessories</Option>
                    <Option value="Other">Other</Option></Select>
                </Item>

                <Item label="Description">
                  <TextArea rows={1} name="description" placeholder="Enter description" onChange={handleChange} />
                </Item>

                <Item label="Image">
                  <input type="file" accept="image/*" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </Item>

                <Item>
                  <Button type="primary" size="large" htmlType="submit" block onClick={handleAddProduct}>Add Product</Button>
                </Item>

              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
};

export default Add;