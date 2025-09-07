import axios from 'axios'
import { BASE_URL } from "../utils/constants";


const Premium = () => {

    const handleByClick = async (type) => {
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
        };

        const rzp = new window.Razorpay(options);
        rzp.open()
    }

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
                    <button onClick={() => handleByClick("silver")} className='btn btn-secondary'>Buy Silver</button>
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
                    <button onClick={() => handleByClick("gold")} className='btn btn-primary'>Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default Premium