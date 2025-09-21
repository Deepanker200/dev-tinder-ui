import React, { useState } from 'react';
import UserCard from "./UserCard";
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link } from 'react-router-dom';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [about, setAbout] = useState(user.about || "");
    const [gender, setGender] = useState(user.gender || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [isEdit, setIsEdit] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        //Clear Errors
        setError("");

        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, photoUrl, age, gender, about, skills
            }, {
                withCredentials: true
            });
            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <>
            <div className='flex flex-col md:flex md:flex-row justify-center my-10'>
                <div className='order-2 md:order-1 flex justify-center mx-10'>
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input type="text"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input type="text"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">Age</span>
                                </div>
                                <input type="text"
                                    value={age}
                                    onChange={(e) => { setAge(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">Gender</span>
                                </div>
                                {/* <input type="text"
                                    value={gender}
                                    onChange={(e) => { setGender(e.target.value) }}
                                    className="input input-bordered w-full " /> */}


                                <select value={gender}
                                    onChange={(e) => { setGender(e.target.value) }}
                                    className="select">
                                    <option disabled={true}>Choose Gender</option>
                                    <option>male</option>
                                    <option>female</option>
                                    <option>others</option>
                                </select>
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">About</span>
                                </div>
                                <input type="text"
                                    value={about}
                                    onChange={(e) => { setAbout(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">Skills</span>
                                </div>
                                <input type="text"
                                    value={skills}
                                    onChange={(e) => { setSkills(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>

                            <label className="form-control w-full  my-1 md:my-2">
                                <div className="label my-1">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input type="text"
                                    value={photoUrl}
                                    onChange={(e) => { setPhotoUrl(e.target.value) }}
                                    className="input input-bordered w-full " />
                            </label>


                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                            <div className='flex justify-end mt-4'>
                                <Link to="/forget-password">
                                    <p>Forget Password?</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 mb-5 md:mb-0">
                    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about, skills, isEdit }} />
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile