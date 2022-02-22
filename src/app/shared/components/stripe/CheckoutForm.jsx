import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import axios from "axios";

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { totP: this.props.totToPay };

    }
    handleToken(token) {
        alert(JSON.stringify(token))
        console.log(token);
        axios.post("http://localhost:8080/api/payment/charge", "", {
            headers: {
                token: token.id,
                amount: this.state.totP,

            },
        })
            .then((res) => {

                alert(res.status)
            })
            .catch((error) => {
                alert(error);
            });
    }


    handleSubmit = async event => {
        event.preventDefault();

        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
            console.log(result.error.message);
        } else {






            alert(JSON.stringify(result.token))
            this.handleToken(result.token)

            console.log(result.token);
        }
    };

    render() {
        return (
            <div className="w-2/3">
                <div class="product-info">
                    <h4 className="product-price">Tot: {this.state.totP}</h4>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>

                        <input className="inputCardOwner placeholder-gray-300 w-full text-slate-300 text-lg " type="text" name="name" placeholder={"Propriétaire "} />
                    </label>          <CardSection />
                    <button disabled={!this.props.stripe} className="btn-pay">
                        Payer                    </button>
                </form>
            </div>
        );
    }
}

export default function InjectedCheckoutForm({ totToPay }) {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (<>
                <CheckoutForm stripe={stripe} elements={elements} totToPay={totToPay} />
            </>)}
        </ElementsConsumer>
    );
}