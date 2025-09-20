import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {

    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()


    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id))
        } catch (err) {
            //ERROR
        }
    }


    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true
            })
            dispatch(addRequest(res.data.data));
        } catch (err) {
            //ERROR
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    if (!requests) return;

    if (requests.length == 0) return <h1 className='text-2xl md:text-4xl text-center font-bold my-40'>No New Request Found!</h1>

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl md:text-4xl text-white mb-6 font-bold'>Connection Requests</h1>
            {requests.map((request) => {

                const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;

                return (
                    <div key={_id} className='flex justify-between items-center p-2 md:p-4 rounded-lg bg-base-300 w-[350px] md:w-2/3 mx-auto my-10'>
                        <div>
                            <img alt='photo' src={photoUrl} className='max-w-full h-auto md:w-20 md:h-20 rounded-full' />
                        </div>

                        <div className='text-start mx-4'>
                            <h2 className='font-bold md:text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p className='w-[100px] md:w-[600px] line-clamp-3'>{about}</p>
                        </div>
                        <div className='flex gap-2'>
                            <button className="btn btn-primary btn-sm md:btn-md" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary btn-sm md:btn-md" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests