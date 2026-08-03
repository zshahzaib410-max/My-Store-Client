import { Button, Card, Col, Row, Typography } from "antd";
import { ShoppingCartOutlined, SafetyCertificateOutlined, TruckOutlined, StarFilled, } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <>
      {/* Hero Section */}

      <div className="py-5" style={{ background: "linear-gradient(135deg,#0d6efd,#6ea8fe)", color: "#fff", }} >
        <div className="container">
          <Row align="middle" gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <Title style={{ color: "#fff", fontSize: "48px" }}> Welcome To NB Store </Title>

              <Paragraph style={{ color: "#fff", fontSize: "18px", }} >
                Discover premium products with amazing prices and fast delivery.
                Shop confidently with secure payments and quality guaranteed.
              </Paragraph>

              <Link to="/products">
                <Button type="primary" size="large" style={{ background: "#fff", color: "#0d6efd", fontWeight: "bold", }} >
                  Shop Now
                </Button>
              </Link>
            </Col>

            <Col xs={24} md={12}>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                className="img-fluid rounded shadow"
                alt="watch"
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Features */}

      <div className="container py-5">
        <Title level={2} className="text-center mb-5">  Why Choose Us </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className="text-center shadow-sm">
              <TruckOutlined style={{ fontSize: 45, color: "#0d6efd" }} />

              <Title level={4} className="mt-3"> Fast Delivery </Title>

              <Paragraph> Quick nationwide shipping directly to your doorstep. </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card className="text-center shadow-sm">
              <SafetyCertificateOutlined style={{ fontSize: 45, color: "#0d6efd" }} />

              <Title level={4} className="mt-3"> Secure Payment </Title>

              <Paragraph> 100% secure payment methods for worry-free shopping. </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card className="text-center shadow-sm">
              <ShoppingCartOutlined  style={{ fontSize: 45, color: "#0d6efd" }} />

              <Title level={4} className="mt-3"> Best Products </Title>

              <Paragraph> High-quality products at affordable prices.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Reviews */}

      <div className="py-5"style={{  background: "#f8f9fa", }} >
        <div className="container">
          <Title level={2} className="text-center mb-5"> Happy Customers </Title>

          <Row gutter={[24, 24]}>
            {[1, 2, 3,4].map((item) => (
              <Col xs={24} md={6} key={item}>
                <Card>
                  <StarFilled style={{ color: "#ffc107" }} />{" "}
                  <StarFilled style={{ color: "#ffc107" }} />{" "}
                  <StarFilled style={{ color: "#ffc107" }} />{" "}
                  <StarFilled style={{ color: "#ffc107" }} />{" "}
                  <StarFilled style={{ color: "#ffc107" }} />

                  <Paragraph className="mt-3"> Amazing quality products and excellent customer service. </Paragraph>

                  <b>NB Store Customer</b>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;