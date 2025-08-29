import React from 'react'

const UserCard = ({ user }) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user;

    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="user-img" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName+" "+lastName}</h2>
                    {age && gender && <p>{age+", "+gender}</p>}
                    <p className='break-words'>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Send Request</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard