import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import useModal from "../utils-components/Modal/useModal";
import ModalSuccessPay from "../utils-components/Modal/ModalSuccessPay";
import logo from "./../../../assets/images/icones/logo/warhammer-shop-logo.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init, selectCart } from '../../../shared/redux-store/cartSlice'
import { useSelector } from "react-redux";
import { isAuthenticated } from '../../../shared/services/accountServices';
import { URL_LOGIN } from "../../constants/urls/urlConstants";
import { addOrder } from "../../../api/backend/order";




function ButtonStripe(props) {
    const carts = useSelector(selectCart)

    const history = useHistory()
    const dispatch = useDispatch();


    const validate = (carts) => {
        if (isAuthenticated()) {
            addOrder(carts.filter(c => !(c.quantite === ""))).then(res => {
                if (res.data)
                    localStorage.removeItem('myAddress')
            }
            )
        } else {
            history.push(URL_LOGIN)
        }
    }

    const hideSuccess = () => {
        toggleSuccessForm()
        dispatch(init())


        history.push('/')

    }

    const { isShowing: isAddressFormShowed, toggle: toggleSuccessForm } = useModal();


    async function handleToken(token) {
        console.log(token);
        await axios
            .post("http://localhost:8080/api/payment/charge", "", {
                headers: {
                    token: token.id,
                    amount: props.amountO,
                },
            })
            .then(() => {


                validate(carts)


                toggleSuccessForm()
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div className="ButtonStripe">
            <StripeCheckout
                stripeKey="pk_test_51KK9NkAvTn1DnSSqnzRsFb8er0ixZXhPSAbOC2pPCszrsitVBz2X9PKRGP9ymRO8weIYbNqpFXCAlfGuxgV6UDS0004nDX8FHN"
                token={handleToken}
                description="Warhammer Market"
                image={logo}
            >
                <button className="validateCart mt-2" >Payer {props.amountO} €</button>


            </StripeCheckout>
            <ModalSuccessPay
                isShowing={isAddressFormShowed}
                hide={hideSuccess}
                title="SUCCESS"
                amount={props.amountO}
            >
            </ModalSuccessPay>

        </div>
    );
}

export default ButtonStripe;
