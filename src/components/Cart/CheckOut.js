import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "axios";


const stripePromise = loadStripe("pk_test_51IIRdTAFsD8SicQAEzysAxtsHVlJeyPUeMM5mIVw5ExCB0KxW0E8gbs49PNVf4lr4VJ6446ckGsNYPRzs4lVCuHS00KXBtQBZk")
const CheckOutForm = (props) => {
    const { cartTotalPrice } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        setLoading(true);

        if (!error) {
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post("https://sodulce-cart.herokuapp.com/api/checkout", {
                    id,
                    amount: cartTotalPrice
                });
                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit}>
        {/* Product Information */}




        <CardElement />

        <button disabled={!stripe} className="btn btn-success">
            {loading ? (
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                "Comprar"
            )}
        </button>
    </form>
}
function CheckOut(props) {
    const { cartTotalPrice } = props;
    return (<>

        <Elements stripe={stripePromise}>
            <CheckOutForm cartTotalPrice={cartTotalPrice} />
        </Elements>
    </>);
}

export default CheckOut;
