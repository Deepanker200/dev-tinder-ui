import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("virat@gmail.com");
    const [password, setPassword] = useState("Virat@123");
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
            return navigate('/feed')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-1">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input type="text"
                            value={emailId}
                            onChange={(e) => { setEmailId(e.target.value) }}
                            className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label my-1">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="text"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="input input-bordered w-full max-w-xs" />
                    </label>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login