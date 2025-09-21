import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
    return (
        <>
            <div className='flex justify-center items-center my-40'>
                <div className='text-center flex flex-col gap-4'>
                    <h1 className='text-2xl md:text-4xl text-center font-bold'>Welcome To 🧑‍💻DevTinder</h1>
                    <h2 className='text-xl md:text-2xl text-center font-semibold'>It is an online community for developers to connect</h2>
                    <h3 className='text-xl md:text-2xl text-center'>Go to Login Page to Connect with other Developers!</h3>
                    <Link to="/login">
                        <button className='btn btn-secondary'>Login Page</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AboutPage