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
    const [gender, setGender] = useState(user.gender || "male");
    const [skills, setSkills] = useState(user.skills || "");
    const [isEdit, setIsEdit] = useState(true);
    const [photoPreview, setPhotoPreview] = useState(user.photoUrl);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);

    // Handle image file upload
   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);  // ✅ DEBUG
    
    if (file) {
        console.log("File is valid, setting photoFile...");
        setPhotoFile(file);
        
        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        console.log("No file selected!");
    }
};

    const saveProfile = async () => {
        setError("");

        try {
            // Create FormData
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('about', about);
            formData.append('skills', skills);
            
            // ✅ Only append photo if a NEW file was selected
            if (photoFile) {
                formData.append('photo', photoFile);
                console.log("Photo file appended to FormData:", photoFile);
            } else {
                console.log("No new photo file selected, keeping existing photo");
            }

            const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log("Response:", res);

            if (res.data && res.data.data) {
                dispatch(addUser(res.data.data));
                setPhotoFile(null); // ✅ Clear file after successful upload
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            } else {
                setError("Profile saved but response format unexpected");
            }
        } catch (err) {
            console.log("Error:", err);
            setError(err.response?.data?.message || "Error saving profile");
        }
    }

    return (
        <>
            <div className='flex flex-col md:flex md:flex-row justify-center mt-28 mb-10'>
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
                                <select value={gender}
                                    onChange={(e) => { setGender(e.target.value) }}
                                    className="select w-full">
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
                                    <span className="label-text">Upload Photo</span>
                                </div>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-primary w-full" 
                                />
                            </label>

                            {/* {photoPreview && (
                                <div className="mt-4 text-center">
                                    <p className="label-text mb-2">Photo Preview:</p>
                                    <img src={photoPreview} alt="Preview" className="w-40 h-40 rounded-lg object-cover mx-auto" />
                                </div>
                            )} */}

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
                    <UserCard user={{ firstName, lastName, photoUrl: photoPreview, age, gender, about, skills, isEdit }} />
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