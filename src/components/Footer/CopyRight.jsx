import { Col, Row, Typography } from "antd";

const { Text } = Typography;

const CopyRight = () => {
  return (
    <footer style={{ background: "#0d6efd", }} className="py-3" >

      <div className="container">

        <Row align="middle">

          <Col xs={24} md={12}>
            <Text className="text-white"> © {new Date().getFullYear()} NB Store </Text>
          </Col>

          <Col xs={24} md={12} className="text-md-end text-center mt-2 mt-md-0" >
            <Text className="text-white">  Quality Products • Fast Delivery • Secure Shopping </Text>
          </Col>

        </Row>

      </div>
    </footer>
  );
};

export default CopyRight;