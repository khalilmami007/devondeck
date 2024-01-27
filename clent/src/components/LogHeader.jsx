
import React from 'react'
import { Link } from 'react-router-dom'


const LogHeader = () => {

    return (
        <div className='header'>
        <h1>DevsOnDeck</h1> <Link to="/">Dev Registration</Link><Link to="/orgs/Register">Org Registration</Link></div>
    )
}

export default LogHeader