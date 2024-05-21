import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Admin = () => {
    const { currentUser } = useAuth()
    return (
        <div className='text-2xl font-bold pt-14'>Hello Admin {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
    )
}

export default Admin