import { Button, Dropdown, Modal, Popconfirm, Typography, Form, Input, Grid } from 'antd'
import React, { useEffect, useState } from 'react'
import { Table, Tag, Select } from 'antd';
import axios from 'axios';

const { Option } = Select



const Users = () => {
  const [documents, setDocuments] = useState([])
  const [processing, setProcessing] = useState(false)
  const [modalOPen, setModalOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [form] = Form.useForm()

  // FOR RESPONSIVE DESGIN
const {useBreakpoint}=Grid
const screen=useBreakpoint()

  const getDocuments = (token) => {
    setProcessing(true)
    const jwt = token || localStorage.getItem('jwt')
    axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        if (res.status === 200) {
          setDocuments(res.data.users)
          window.toastify(res.data.message, "success")
        } else {
          window.toastify(res.data.message, "error")
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


  useEffect(() => {
    getDocuments()
  }, [])

  //DELETE HANDLE CODE HERE
  const handleDelete = (userDelete) => {
    setProcessing(true)
    const jwt = localStorage.getItem('jwt')
    axios.patch(`${import.meta.env.VITE_API_URL}/auth/delete-user-by-superadmin/${userDelete.uid}`, {}, { headers: { Authorization: `Bearer ${jwt}`} })
      .then((res) => {
        if (res.status === 200) {
          window.toastify(res.data.message, "success")
          const filterUser = documents.filter(doc => doc.uid !== userDelete.uid)
          setDocuments(filterUser)

        } else {
          window.toastify(res.data.message, "error")
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


  // Edit HANDLE CODE HERE
  const handleEdit = (record) => {
    setEditUser(record)
    form.setFieldsValue({
      fullName: record.fullName,
      email: record.email,
      status: record.status,
      role: record.role
    })
    setModalOpen(true)
  }

  // HANDLE UPDATE HERE

  const handleUpdate = (values) => {
    setProcessing(true);
    const jwt = localStorage.getItem("jwt");

    axios.patch( `${import.meta.env.VITE_API_URL}/auth/user-update-by-superadmin/${editUser.uid}`, values, { headers: { Authorization: `Bearer ${jwt}`, }, })
      .then((res) => {
        if (res.status === 200) {
          window.toastify(res.data.message, "success");

          setModalOpen(false);   // Modal band
          getDocuments();        // Table refresh
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
  const columns = [
    { title: 'UID', dataIndex: 'uid', key: 'uid', responsive: ["lg"], },
    { title: 'Name', dataIndex: 'fullName', key: 'fullName', },
    { title: 'Email', dataIndex: 'email', key: 'email', },

    {
      title: 'Role', dataIndex: 'role', key: 'role', responsive: ["md"], render: role => (
        <Tag color={role === "superAdmin" ? "green" : "blue"} >{role?.toUpperCase()}</Tag>
      )
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt", responsive: ["lg"], render: (date) => new Date(date).toLocaleDateString(), },

    {
      title: 'Status', dataIndex: 'status', key: 'status', responsive: ["md"], render: status => (
        <Tag color={status === "active" ? "green" : "blue"} >{status?.toUpperCase()}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown menu={{
          items: [
            { label: "Edit", key: "edit", onClick: () => handleEdit(record) },
            { label: <Popconfirm title="Are yo sure" onConfirm={() => handleDelete(record)} >Delete</Popconfirm>, key: "delete", danger: true },
          ]
        }} >
          <Button type='link' >Action</Button>

        </Dropdown>
      ),
    },

  ];
  return (
    <div className='<div className="container-fluid py-4">' >
      <Typography.Title className='text-center mb-3' >Users</Typography.Title>
      <div className="table-responsive">
        <Table columns={columns} dataSource={documents} loading={processing} rowKey='uid' pagination={{ pageSize: 5 }} />
      </div>

      {/* ANTD Modal USE HERE */}
      <Modal title="Edit User" open={modalOPen} onCancel={() => setModalOpen(false)}
       width={screen.lg ? 600 : screen.md ? 500 : 350 } centered footer={null}>

        {/* ANTD FORM USE HERE */}
        <Form form={form} layout="vertical" onFinish={handleUpdate} >
          <Form.Item label="Full Name" name="fullName">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Select>
              <Option value="customer">User</Option>
              <Option value="superAdmin">Super Admin</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block  >
            Update User
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default Users