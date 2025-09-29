import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from 'react';


const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyPremiumUser()
    }, []);

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", {
            withCredentials: true
        });

        if (res.data.isPremium) {
            setIsUserPremium(true)
        }
    }


    const handleBuyClick = async (type) => {
        const order = await axios.post(BASE_URL + "/payment/create",
            {
                membershipType: type,
            },
            { withCredentials: true }
        );

        //It should open Razorpay Dialog box

        // Open Razorpay Checkout
        const { amount, keyId, currency, notes, orderId } = order.data;

        const options = {
            key: keyId,
            amount,
            currency,
            name: 'Dev Tinder',
            description: 'Connect to other developers',
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
            handler: verifyPremiumUser,
        };

        const rzp = new window.Razorpay(options);
        rzp.open()
    }

    return isUserPremium ? (
        <h1 className='text-2xl md:text-4xl text-center font-bold my-40'>Hurray! You are already a premium user ✅</h1>
    ) : (
        <div className='m-10 mt-28'>
            <div className="block md:flex w-full">
                <div className="card bg-base-300 rounded-box h-80 grid grow place-items-center p-10 gap-3">
                    <h1 className='font-bold text-3xl'>Silver Membership</h1>
                    <ul>
                        <li>- Chat with other people</li>
                        <li>- 100 connection Requests per day</li>
                        <li>- Blue Tick</li>
                        <li>- 3 Months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("silver")} className='btn btn-secondary'>Buy Silver</button>
                </div>

                <div className="divider md:divider-horizontal text-center">OR</div>

                <div className="card bg-base-300 rounded-box grid grow place-items-center p-10 gap-3">
                    <h1 className='font-bold text-3xl'>Gold Membership</h1>
                    <ul>
                        <li>- Chat with other people</li>
                        <li>- Infinite connection Requests per day</li>
                        <li>- Blue Tick</li>
                        <li>- 6 Months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("gold")} className='btn btn-primary'>Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default Premium