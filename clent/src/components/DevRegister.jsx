import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RegHeader from './RegHeader';
const Register = (props) => {

    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [adress, setAdress] = useState(""); 
    const [city, setCity]  = useState(""); 
    const [state, setState]  = useState(""); 
    const [password, setPassword]  = useState(""); 
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [confirmPassword, setConfirmPassword]  = useState(""); 
    const [conpwdError, setconpwdError] = useState("");

    
    const handleconPwd = (e) => {
        setConfirmPassword(e.target.value);
        if(e.target.value!==password)
          { setconpwdError("check your password confirmation!");}
        else {
          setconpwdError("");
          }
      } 
    const onSubmitHandler = (e) => {
            e.preventDefault();
            axios.post('http://localhost:5000/api/devs/register', {firstName:firstName,lastName:lastName,
            email:email,adress:adress,city:city,state:state,password:password})
                .then(res=>{console.log(res)
                    console.log(" le resultat est:"+res.data.Developer)
                    navigate("/devs/skills/languages")
                    props.setDevId(res.data.Developer._id)
                   console.log("dev number est:  "+res.data.Developer._id)
                })
                .catch(err=>{
                    const errorResponse = err.response.data.errors; 
                    const errorArr = []; 
                    for (const key of Object.keys(errorResponse)) { 
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })         
                         
        }
         

    return (
        <div>
            <RegHeader/>
             <Card style={{ width: '50rem' }} className='addform'>
                <Card.Body className='addform'>
                <h2>Developer sign up</h2>
                    <Form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => (<p key="{index}" className='errortext'>{err}</p>))}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        
                        <div >
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text"  onChange = {(e)=>setFirstName(e.target.value)}/>
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" onChange = {(e)=>setLastName(e.target.value)}/>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text"  onChange = {(e)=>setEmail(e.target.value)}/>
                        <Form.Label>Adress:</Form.Label>
                        <Form.Control type="text" onChange = {(e)=>setAdress(e.target.value)}/>
                        <Form.Label>City:</Form.Label>
                        <Form.Control type="text" onChange = {(e)=>setCity(e.target.value)}/>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange = {(e)=>setPassword(e.target.value)}/>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" name="ConfirmPassword" onChange = {handleconPwd} />
                                 {conpwdError ?<p>{ conpwdError }</p> :''}
                       
                        </div>
                        
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                    <Link to="/orgs/register"> Need to sign up an Organization?</Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Register