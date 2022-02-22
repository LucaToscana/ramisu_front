import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import axios from "axios";
import { accountLogin } from "../../services/accountServices";

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totP: this.props.totToPay,
            remeber: false
        };

    }
    handleTokenOneTimesPayment(token) {
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

    handleTokenPayWithCustomerCart(token,cunstomer) {
        console.log(token);
        axios.post("http://localhost:8080/api/payment/charge-customer-card", "", {
            headers: {
                token: token.id,
                cunstomer: cunstomer,
                amount: this.state.totP,


            },
        })
            .then((res) => {

                alert(JSON.stringify(res.data))
            })
            .catch((error) => {
                alert(error);
            });
    }



    handleTokenSavePayement(token) {
        console.log(token);
        axios.post("http://localhost:8080/api/payment/new-customer", "", {
            headers: {
                token: token.id,
                mail: accountLogin(),

            },
        })
            .then((res) => {

              return res
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
            if (this.state.remeber === false) {
                this.handleTokenOneTimesPayment(result.token)
            } else {

                this.handleTokenSavePayement(result.token)
              

            console.log(result.token);
        }
    }}
    render() {
        return (
            <div className="w-full">
                <div class="product-info ">
                    <h4 className="product-price ">Tot: {this.state.totP}€</h4>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>

                        <input className="inputCardOwner placeholder-gray-300 w-full text-slate-300 text-lg " type="text" name="name" placeholder={"Propriétaire "} />
                    </label>          <CardSection />
                    <button disabled={!this.props.stripe} className="btn-pay">
                        Payer                    </button>
                </form>
                <div class="flex mt-2 mb-2">
                    <input onClick={() => {
                        this.setState({ remeber: !this.state.remeber })
                    }} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" value="" id="flexCheckCheckedDisabled" />
                    <label htmlFor="rememberMe" className="m-0 text-gray-400 text-sm">
                        Mémorisez pour mes futurs achats
                    </label></div>
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