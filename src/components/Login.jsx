import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash, faLock, faUser, faUserSecret, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    
    const userDetails=useSelector((store)=>store.user);

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const res = await axios.post(BASE_URL + "/login",
                {
                    emailId, password
                },
                { withCredentials: true }
            )
            // console.log(res);
            dispatch(addUser(res.data));
            return navigate('/')
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!")
            // console.error(err);
        }
    }

    const handleSignUp = async () => {

        try {
            const res = await axios.post(BASE_URL + "/signup",
                {
                    firstName, lastName, emailId, password
                },
                { withCredentials: true }
            )
            // console.log(res);
            dispatch(addUser(res.data.data));
            return navigate('/profile')
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!")
            // console.error(err);
        }
    }

    const handlePassword=()=>{
        setSeePassword(!seePassword)
    }

    if (userDetails) return navigate("/");

    return (
    <>
        <div className='flex justify-center my-10 mx-8'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Welcome Back 👋" : "Create an Account"}</h2>
                    {!isLoginForm &&
                        <>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label my-1">
                                    <span className="label-text">First Name</span>
                                </div>
                                <div className='flex border bg-black-900 rounded-md'>
                                    <div className='px-3 flex justify-center items-center'>
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <input type="text"
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0" />
                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label my-1">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <div className='flex border bg-black-900 rounded-md'>
                                    <div className='px-3 flex justify-center items-center'>
                                        <FontAwesomeIcon icon={faUserSecret} />
                                    </div>
                                    <input type="text"
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0" />
                                </div>
                            </label>
                        </>
                    }
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-1">
                            <span className="label-text">Email ID</span>
                        </div>
                        <div className='flex border bg-black-900 rounded-md'>
                            <div className='px-3 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <input type="text"
                                value={emailId}
                                onChange={(e) => { setEmailId(e.target.value) }}
                                className="input w-full max-w-xs hover:no-underline focus:outline-none focus:ring-0" />
                        </div>
                    </label>

                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-1">
                            <span className="label-text">Password</span>
                        </div>
                        <div className='flex items-center border bg-black-900 rounded-md'>
                            <div className='px-3 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <input type={seePassword?"text":"password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="input w-full max-w-xs  focus:outline-none focus:ring-0" />
                            <FontAwesomeIcon icon={seePassword?faEyeSlash:faEye} className='px-1' onClick={handlePassword}/>
                        </div>
                    </label>

                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Signup"}</button>
                    </div>
                    <p className='cursor-pointer m-auto py-4' onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Create an account" : "Already have an account? Login here"}</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;