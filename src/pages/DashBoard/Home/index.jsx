import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;


const Home = () => {
  const role = localStorage.getItem("role");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = () => {

    const token = localStorage.getItem("jwt");

    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data.stats);
      })
      .catch((err) => {
        console.error(err);
        window.toastify("Something went wrong", "error");
      });

  };

  return (
    <div className="dashboard-home">

      <Title level={2} className="dashboard-title">
        Welcome to NB Store Dashboard
      </Title>

      <Text className="dashboard-subtitle">
        Manage your products, orders and users from one place.
      </Text>

      <Row gutter={[24, 24]} className="mt-4">

        {role === "superAdmin" && (
          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard-card products">
              <ShoppingOutlined className="card-icon" />
              <h2>{stats.totalProducts}</h2>
              <p>Total Products</p>
            </Card>
          </Col>
        )}

        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card orders">
            <ShoppingCartOutlined className="card-icon" />
            <h2>{stats.totalOrders}</h2>
            <p>Total Orders</p>
          </Card>
        </Col>

        {role === "superAdmin" && (
          <Col xs={24} sm={12} lg={6}>
            <Card className="dashboard-card users">
              <UserOutlined className="card-icon" />
              <h2>{stats.totalUsers}</h2>
              <p>Total Users</p>
            </Card>
          </Col>
        )}

        <Col xs={24} sm={12} lg={6}>
          <Card className="dashboard-card delivered">
            <CheckCircleOutlined className="card-icon" />
            <h2>{stats.deliveredOrders}</h2>
            <p>Delivered Orders</p>
          </Card>
        </Col>

      </Row>

    </div>
  );
};

export default Home;