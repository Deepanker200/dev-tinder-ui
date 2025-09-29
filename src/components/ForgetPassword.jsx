import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const ForgetPassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [seeOldPassword, setSeeOldPassword] = useState(false);
    const [seeNewPassword, setSeeNewPassword] = useState(false);



    const forgetPassword = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/password", {
                oldPassword, newPassword
            }, { withCredentials: true }
            )
            setShowToast(true)
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!")
            setShowToast(false)
        }
    }

    const handleOldPassword = () => {
        setSeeOldPassword(!seeOldPassword)
    }


    const handleNewPassword = () => {
        setSeeNewPassword(!seeNewPassword)
    }

    return (
        <>
            {showToast &&
                <div className="toast toast-top toast-end mt-14 z-10">
                    <div className="alert alert-success">
                        <span>Password Updated Successfully</span>
                    </div>
                </div>
            }
            <div className='flex justify-center mt-28 mb-10 mx-8'>
                <div className="card card-border bg-base-300 w-96">
                    <div className='card-body'>
                        <div className="card-body">
                            <h2 className="card-title justify-center">Update Password</h2>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label my-1">
                                    <span className="label-text">Old Password</span>
                                </div>
                                <div className='flex border bg-black-900 rounded-md items-center'>

                                    <input type={seeOldPassword ? "text" : "password"}
                                        value={oldPassword}
                                        onChange={(e) => { setOldPassword(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0" />
                                    <FontAwesomeIcon icon={seeOldPassword ? faEyeSlash : faEye} className='px-1' onClick={handleOldPassword} />

                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label my-1">
                                    <span className="label-text">New Password</span>
                                </div>
                                <div className='flex border bg-black-900 rounded-md items-center'>

                                    <input type={seeNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0" />
                                    <FontAwesomeIcon icon={seeNewPassword ? faEyeSlash : faEye} className='px-1' onClick={handleNewPassword} />

                                </div>
                            </label>
                            {(!showToast ? <p className='text-red-500'>{error}</p> : null)}
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={forgetPassword}>Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword