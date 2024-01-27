import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogHeader from './LogHeader';



const DevLogin=(props)=>{
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

const navigate = useNavigate();
const [errors, setErrors] = useState([]);

  const LoginHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/devs/login',{email:email, password:password},
    )
        .then(res=>{console.log(res)
        console.log(res.data)
        navigate("/devs/jobs")
        })
        .catch(err=>{
        console.log(err)
       })            
    }
    return (
        <div>
       < LogHeader/>
       
        <div className='LogContainer'>
            <h1>Welcome Back, Developer!</h1>
            <h3>Let's Connect You To A Job!</h3>
           <Form onSubmit={LoginHandler}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Email</Form.Label>
                    <Col sm="6">
                    <Form.Control type="email" onChange = {(e)=>setEmail(e.target.value)}/>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="4">Password</Form.Label>
                    <Col sm="6">
                    <Form.Control type="password" onChange = {(e)=>setPassword(e.target.value)} />
                    </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Log In</Button>
                    </Form>
                </div>

                </div>
)}
export default DevLogin;