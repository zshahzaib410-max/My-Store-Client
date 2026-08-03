import { Card, Row, Col, Button, Modal, Form, InputNumber, Input, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;


const Products = () => {

    const [products, setProducts] = useState([]);
    const [processing, setProcessing] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [form] = Form.useForm();


    const getProducts = () => {

        setProcessing(true);

        axios.get(`${import.meta.env.VITE_API_URL}/products/public-call`)

            .then(res => {

                if (res.status === 200) {

                    setProducts(res.data.products);

                }

            })

            .catch(console.error)

            .finally(() => setProcessing(false));

    }

    useEffect(() => {

        getProducts();

    }, []);


    const handleOrder = (product) => {

        setSelectedProduct(product);

        setQuantity(1);

        form.resetFields();

        setModalOpen(true);

    }

    const handleSubmit = values => {

        const token = localStorage.getItem("jwt");

        const order = {

            totalPrice: selectedProduct.price * quantity,

            shippingAddress: values.shippingAddress,

            products: [

                {

                    productId: selectedProduct.id,

                    name: selectedProduct.name,

                    image: selectedProduct.imageUrl,

                    price: selectedProduct.price,

                    quantity

                }

            ]

        }

        axios.post(

            `${import.meta.env.VITE_API_URL}/order/create`,

            order,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

            .then(res => {

                if (res.status === 200) {

                    window.toastify(res.data.message, "success");

                    setModalOpen(false);

                }

            })

            .catch(error => {

                console.error(error);

                window.toastify("Order not created", "error");

            });

    }
    return (
  <>
    <div className="container py-4">

      {/* <Title className="text-center mb-4">
        Products
      </Title> */}

      <Row gutter={[24, 24]}>

        {products.map(product => (

          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>

            <Card
              hoverable
              cover={
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  height={220}
                  style={{ objectFit: "cover" }}
                />
              }
            >

              <h5>{product.name}</h5>

              <p><b>Price:</b> Rs. {product.price}</p>

              <p><b>Stock:</b> {product.stock}</p>

              <p><b>Category:</b> {product.category}</p>

              <p>{product.description}</p>

              <Button
                type="primary"
                block
                disabled={product.stock === 0}
                onClick={() => handleOrder(product)}
              >
                {product.stock > 0 ? "Order Now" : "Out of Stock"}
              </Button>

            </Card>

          </Col>

        ))}

      </Row>

    </div>

    <Modal
      title="Place Order"
      open={modalOpen}
      footer={null}
      onCancel={() => setModalOpen(false)}
      centered
    >

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        <div className="text-center mb-3">

          <img
            src={selectedProduct?.imageUrl}
            alt=""
            width={150}
            height={150}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />

        </div>

        <Form.Item label="Product">

          <Input
            value={selectedProduct?.name}
            readOnly
          />

        </Form.Item>

        <Form.Item label="Price">

          <Input
            value={`Rs. ${selectedProduct?.price || 0}`}
            readOnly
          />

        </Form.Item>

        <Form.Item label="Available Stock">

          <Input
            value={selectedProduct?.stock}
            readOnly
          />

        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          initialValue={1}
        >

          <InputNumber
            className="w-100"
            min={1}
            max={selectedProduct?.stock}
            value={quantity}
            onChange={value => setQuantity(value)}
          />

        </Form.Item>

        <Form.Item
          label="Shipping Address"
          name="shippingAddress"
          rules={[
            {
              required: true,
              message: "Enter shipping address"
            }
          ]}
        >

          <TextArea rows={3} />

        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={processing}
        >
          Pay Rs. {(selectedProduct?.price || 0) * quantity}
        </Button>

      </Form>

    </Modal>

  </>
);
}

export default Products