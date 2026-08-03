import { DashboardOutlined, ShoppingOutlined, ShoppingCartOutlined, DollarCircleOutlined, SafetyCertificateOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const items = [
    { key: "1", label: <Link className="text-decoration-none" to="/dashboard">Dashboard</Link>, icon: <DashboardOutlined /> },
    { key: "3", label: <Link className="text-decoration-none" to="/dashboard/orders">Orders</Link>, icon: <ShoppingCartOutlined /> },
    { key: "2", label: <Link className="text-decoration-none" to="/dashboard/products">Products</Link>, icon: <ShoppingOutlined />, allowedroles: ["superAdmin"] },
    { key: "7", label: <Link className="text-decoration-none" to="/dashboard/users">Registered Users</Link>, icon: <UserAddOutlined />, allowedroles: ["superAdmin"] },
];