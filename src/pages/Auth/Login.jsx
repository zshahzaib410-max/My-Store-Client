import { useAuth } from '@/context/AuthContext'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title,Paragraph } = Typography
const { Item } = Form

const intialState={ email:"", password:""}

const Login = () => {
    const[state, setState]=useState(intialState)
    const[isProcessing, setIsProcessing]=useState(false)
    const navigate=useNavigate()
    const { readProfile }=useAuth()

    const handleChange= e=>{ setState( s=> ({...s, [e.target.name]:e.target.value}) ) }

    const handleLogin=() => { 
        let { email, password}=state


        if(!getValidEmail(email)){
          return window.toastify("Enter correct email", "error")  
        }


        const formData={  password, email }

        setIsProcessing(true)
        
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)
        .then( (res) => { 
            const{ data, status }=res
            if(status===200){
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("role", data.user.role)
                window.toastify(data.message, "success")
                setState(intialState)
                readProfile(data.token)
                navigate("/")
            }

         } )
         .catch(error=>{
            console.error(error)
            window.toastify("Something went wrong", "error")

         } )
         .finally( ()=>{
            setIsProcessing(false)
         } )


     }

    return (
        <main className="auth p-2 p-md-3 p-lg-4 flex-center ">
            <div className="container">
                <div className="card p-2 p-md-3 p-lg-4 mx-auto ">
                    <Row>
                        <Col span={24} className='text-center' >
                            <Title>Login</Title>
                            <Paragraph>Don't have an account ? <Link className='' to='/auth/register'  >Register</Link> </Paragraph>

                            <Form layout='vertical' >

                                <Item label='Email' required >
                                    <Input type='email' placeholder='Enter your email' value={state.email} size='large' name='email' onChange={handleChange} />
                                </Item>

                                <Item label='Password' required >
                                    <Input.Password placeholder='Enter your password' value={state.password} size='large' name='password' onChange={handleChange} />
                                </Item>

                                <Item className='mb-0' >
                                    <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleLogin} >Login</Button>
                                </Item>
                            </Form>

                        </Col>

                    </Row>
                </div>
            </div>
        </main>
    )
}

export default Login