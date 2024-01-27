
import React from 'react'
import { Link } from 'react-router-dom'


const RegHeader = () => {

    return (
        <div className='header'>
        <h1>DevsOnDeck</h1> <Link to="/devs/login">Dev LOgin</Link><Link to="/orgs/Login">Org LOgin</Link></div>
    )
}

export default RegHeader