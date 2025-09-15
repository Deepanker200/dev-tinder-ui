import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",
                {
                    withCredentials: true
                })
            // console.log(res.data.data);
            dispatch(addConnections(res.data.data))
        } catch (err) {
            //Handle Error Case
            console.log(err);

        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return;

    if (connections.length == 0) return (
        <>
            <div className='flex justify-center items-center my-40'>
                <div className='text-center flex flex-col gap-8'>
                    <h1 className='text-2xl md:text-4xl text-center font-bold'>OOPS! <br />No connections found</h1>
                    <Link to="/">
                        <button className='btn btn-secondary'>Search for Connections </button>
                    </Link>
                </div>
            </div>
        </>
    )
    // console.log(connections);

    return (
        <div className='text-center my-10'>
            <h1 className='text-2xl md:text-4xl text-center font-bold'>Connections</h1>
           
                    {connections.map((connection) => {

                        const { _id, firstName, lastName, photoUrl, about, age, gender } = connection;

                        return (
                    <div key={_id} className='flex justify-between items-center p-2 md:p-4 rounded-lg bg-base-300 w-[350px] md:w-2/3 mx-auto my-10'>
                                <div>
                                    <img alt='photo' src={photoUrl} className='max-w-full h-auto md:w-20 md:h-20 rounded-full' />
                                </div>

                                <div className='text-start mx-4'>
                                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                                    {age && gender && <p>{age + " " + gender}</p>}
                                    <p className='w-[100px] md:w-[600px] line-clamp-3'>{about}</p>
                                </div>
                                <Link to={"/chat/" + _id}>
                                    <button className='btn btn-primary'>Chat</button>
                                </Link>
                            </div>
                        )
                    })}
        </div>
    )
}

export default Connections