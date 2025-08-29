import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import UserCard from './UserCard'

const Connections = () => {

    const fetchConnections=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",
                {
                    withCredentials:true
                })
                console.log(res.data.data);
                const userName=res.data.data
        }catch(err){
            //Handle Error Case
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[])

  return (
    <div className='flex justify-center my-10'>
        <h1 className='text-bold text-2xl'>Connections</h1>
    </div>
  )
}

export default Connections