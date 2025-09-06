import React from 'react'

const Premium = () => {
    return (
        <div className='m-10'>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box h-80 grid grow place-items-center p-10">
                <h1 className='font-bold text-3xl'>Silver Membership</h1>
                <ul>
                    <li>- Chat with other people</li>
                    <li>- 100 connection Requests per day</li>
                    <li>- Blue Tick</li>
                    <li>- 3 Months</li>
                </ul>
                <button className='btn btn-secondary'>Buy Silver</button>
                </div>
                
                <div className="divider divider-horizontal">OR</div>
                
                <div className="card bg-base-300 rounded-box grid grow place-items-center p-10">
                <h1 className='font-bold text-3xl'>Gold Membership</h1>
                 <ul>
                    <li>- Chat with other people</li>
                    <li>- Infinite connection Requests per day</li>
                    <li>- Blue Tick</li>
                    <li>- 6 Months</li>
                </ul>
                <button className='btn btn-primary'>Buy Silver</button>
                </div>
            </div>
        </div>
    )
}

export default Premium