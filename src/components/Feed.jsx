import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from "./UserCard";
import AboutPage from './AboutPage'

const Feed = () => {

  const feed=useSelector((store)=>store.feed);
  const userData=useSelector((store)=>store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed && feed.length>0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
      console.log(res.data);
      
    } catch (err) {
      //ERROR PAGE
    }
  }

  useEffect(()=>{
    if(userData){  // Only fetch feed if user is logged in
      getFeed();
    }
  },[userData])

  if(!userData) return <><AboutPage/></>; // Not logged in → show nothing / redirect elsewhere

if(!feed) return;

if(feed.length<=0) return <><h1 className='text-2xl md:text-4xl text-center font-bold my-40'>No New Users Found!</h1></>
  return (
    (feed && <div className='flex justify-center mt-28 mb-10'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed