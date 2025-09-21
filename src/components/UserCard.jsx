import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about, skills, isEdit } = user;
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState()

    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/"
                + status + "/" + userId, {}, {
                withCredentials: true
            })
            dispatch(removeUserFromFeed(userId))

            if (status === "interested") {
                setMessageToast(true);
            }
            else {
                setMessageToast(false)
            }
            setShowToast(true);


            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (err) {
            console.err(err)
        }
    }

    return (
        <>
            {showToast &&
                <div className="toast toast-top toast-end mt-14 z-10">
                    <div className={"alert " + (messageToast ? "alert-success" : "bg-red-600")}>
                        <span>{messageToast ? "Request Sent Successfully" : "Ignored Successfully"}</span>
                    </div>
                </div>
            }
            <div className="card bg-base-300 w-72 md:w-96 shadow-sm mx-auto md:mx-10">
                <figure>
                    <img className='w-full'
                        src={photoUrl}
                        alt="user-img" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p className='break-words'>{about}</p>
                    <p>{skills}</p>
                    {isEdit ? "" : <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Send Request</button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default UserCard