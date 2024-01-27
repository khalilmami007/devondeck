import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';


const SubHeader = () => {
    const navigate=useNavigate()
    const LogoutHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/logout',{}, {withCredentials: true})
            .then(res=>{console.log(res)
                console.log(res.data)
                navigate("/")
            })
            .catch(err=>{
                console.log(err)
    })            
    }
    return (
        <div className='header'>
        <h1>DevsOnDeck</h1> <Link onClick={LogoutHandler}>Logout</Link></div>
    )
}

export default SubHeader