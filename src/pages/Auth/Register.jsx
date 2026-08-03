import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title,Paragraph } = Typography
const { Item } = Form

const intialState={fullName:"", email:"", password:"", confirmPassword:""}

const Register = () => {
    const[state, setState]=useState(intialState)
    const[isProcessing, setIsProcessing]=useState(false)
    const navigate=useNavigate()

    const handleChange= e=>{ setState( s=> ({...s, [e.target.name]:e.target.value}) ) }

    const handleRegister=() => { 
        let {fullName, email, password, confirmPassword}=state

        if(fullName.trim() < 3){
            return window.toastify("Enter full name", "error")
        }

        if(!getValidEmail(email)){
          return window.toastify("Enter correct email", "error")  
        }

        if(password < 6){
            return window.toastify("Enter 6 character password", "error")
        }

        if(confirmPassword !== password){
            return window.toastify("Check your password", "error")
        }

        const formData={ fullName, password, email }

        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData)
        .then( (res) => { 
            const{ data, status }=res
            if(status===201){
                window.toastify(data.message, "success")
                setState(intialState)
                navigate("/auth/login")
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
                            <Title>Register</Title>
                            <Paragraph>Already have an account ? <Link className='' to='/auth/login'  >Login</Link> </Paragraph>

                            <Form layout='vertical' >
                                <Item label='Name' required >
                                    <Input type='text' placeholder='Enter your name' value={state.fullName} size='large' name='fullName' onChange={handleChange} />
                                </Item>

                                <Item label='Email' required >
                                    <Input type='email' placeholder='Enter your email' value={state.email} size='large' name='email' onChange={handleChange} />
                                </Item>

                                <Item label='Password' required >
                                    <Input.Password placeholder='Enter your password' value={state.password} size='large' name='password' onChange={handleChange} />
                                </Item>

                                <Item label='Confirm Password' required >
                                    <Input.Password placeholder='Enter your confirm password' value={state.confirmPassword} size='large' name='confirmPassword' onChange={handleChange} />
                                </Item>

                                <Item className='mb-0' >
                                    <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleRegister} >Register</Button>
                                </Item>
                            </Form>

                        </Col>

                    </Row>
                </div>
            </div>
        </main>
    )
}

export default Register