import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../../../assets/images/icones/logo/warhammer-shop-logo.png";

import StripeInput from "../../../stripeInput/StripeInput";

const ModalPayCBWarahmmerMarket = ({ isShowing, hide, tot, stripePromise,submit,remember,isRemember,errorPay }) =>
    isShowing
        ? ReactDOM.createPortal(
            <>
                <div className="modal-overlay">
                    <div className="modal-wrapper">
                        <div className="modal">
                           <div className="flex justify-end"> <button
                                    type="button"
                                    className="modal-close-button"
                                    onClick={hide}
                                >
                                    <span>&times;</span>
                                    
                                </button></div>
                            <div className="modal-header">
                                <div className="modal-body items-center justify-center text-center">
                                   


                                </div>
                            </div>                       

                            <div className="  items-center justify-center text-center"> 
                            {<div className="self-center p-3">
                                        <img src={logo} className="h-24"></img>

                                        <StripeInput  tot={tot} stripePromise={stripePromise} submit={submit} tot={tot} remember ={remember}isRemember={isRemember} errorPay={errorPay}></StripeInput>
                                    </div>}
                          </div>
                        </div>
                    </div>
                </div>


                <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1040;
              background-color: rgba(0, 0, 5, 0.2);
            }

            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1050;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              outline: 0;
              display: flex;
              align-items: center;

            }

            .modal {
              z-index: 100;
              position: relative;
              margin: auto;
              border-radius: 5px;
              max-width: 150%;
              width: 80%;
              padding: 1rem;
              background-color: rgba(250, 290, 230, 1);

            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              
              font-size: 2.4rem;
              font-weight: 100;
              color: #000;
              cursor: pointer;
              border: none;
              background: transparent;
            }
          `}</style>
            </>,
            document.body
        )
        : null;

export default ModalPayCBWarahmmerMarket;