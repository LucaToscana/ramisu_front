import React from "react";
import ReactDOM from "react-dom";
import ModalAddressForm from "./ModalAddressForm";

const ModalAddress = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay">
          <div className="modal-wrapper">

            <div className="modal">
              <div className="modal-header">
              <h1 className='flex items-end font-bold text-xs'>A domicile (gratuit a partir de 25 €)</h1>


                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div><p className="flex items-end text-xs">             Le port Standard coûte 6€ et il est OFFERT pour toute commande de plus de 25€. Tous les frais de port incluent les taxes et frais de douane.
                </p>
                
              <div className="modal-body flex w-full">
                
              
                
                
                    <ModalAddressForm></ModalAddressForm>
              </div>





            </div>
          </div>
        </div>
        {/*    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: unquote("calc(100vh - 20px)");*/ }

      </>,
      document.body
    )
    : null;

export default ModalAddress;

/**/