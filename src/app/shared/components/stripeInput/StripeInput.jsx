import React from "react";
import {
  usePaymentInputs,
  PaymentInputsWrapper
} from "react-payment-inputs";
import { Field, Form, Formik } from "formik";
import images from "react-payment-inputs/lib/images";
import { Debug } from "./debug";
import { gt, isEmpty, isNil, lt, length, match, split, trim } from "ramda";
import { stylish, stylish2 } from "./inputWrapperStyles";
import useWindowDimensions from "./windowDimensions";
import { accountLogin } from "../../services/accountServices";
import { URL_USER_PAY_METOD } from "../../constants/urls/urlConstants";

const validateName = value => {
  //validate for only middle Initial
  let errorMessage;
  let singleName = value => split(" ", trim(value));
  let nameLength = value => length(value) < 2;

  if (isEmpty(value)) {
    errorMessage = "Name is required";
    // } else if (length(value) < 5) {
  } else if (lt(length(value), 5)) {
    errorMessage = "Too Short";
    // } else if (length(value) > 50) {
  } else if (gt(length(value), 50)) {
    errorMessage = "Too Long";
  } else if (isEmpty(match(/ /, trim(value)))) {
    errorMessage = "Enter Full (First and Last) Name Here";
    // } else if (!isEmpty(filter(nameLength, singleName(value)))) {
    //   errorMessage = "Too Short";
  }
  return errorMessage;
};

const ccValidator = value => {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);
};

export const StripeInput = ({ isUS, submit, tot, remember, isRemember, errorPay, cards }) => {
  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getZIPProps,
    meta,
    wrapperProps
  } = usePaymentInputs();




  const locationMetod = () => {
    const test = window.location.pathname

    if (test === URL_USER_PAY_METOD) { return true }
    else { return false }
  }
  const email = () => accountLogin()
  const { height, width } = useWindowDimensions();

  return (
    <div className="flex justify-center" style={{ maxWidth: 800 }}>
      <div className="text-center">
        <h1 className="font-bold m-2">AUTORISATION DE VOTRE CARTE DE CRÉDIT:</h1>
        <p className="mb-5 text-xs">
          Il n'est pas rare qu'une demande d'autorisation de carte de crédit soit refusée une ou deux fois avant que la carte soit finalement autorisée. Nous vous transmettrons un courriel en cas de difficulté lors de l'autorisation de votre carte de crédit.</p>
        <div className="h-48 lg:h-32  mt-10 lg:w-full text-mds  ">
      
        {locationMetod() ?    <h1 className="font-bold text-2xl m-2">AJOUTER UN MOYEN DE PAIEMENT</h1>:null}


          {errorPay === 3 ? <p className="text-red-500 text-sm">Vous avez atteint  la limite de cartes enregistrées, supprimez un ancien mode de paiement pour enregistrer une nouvelle carte</p> : null}</div>
        {!locationMetod() ? <div><p className="font-bold trxt-2xl">Tot a payer : {tot}€</p></div> : null}
        <Formik
          // validationSchema={}
          enableReinitialize={true}
          initialValues={{
            cardHolder: "",
            email: email(),
            cardNumber: "",
            cvc: "",
           // zip: "",
            expiryDate: "",
            amount: ""
          }}
          onSubmit={values => submit(values)}

          render={formikProps => (
            <React.Fragment>
              <Form>
                <div className="stripe-form">

                  <div className="column is-four-fifths">
                    <div className="field">
                      <label className="label"><h1 className="font-bold">Email</h1></label>
                      <div className="control has-icons-left ">
                    <p >   <Field
                          className={
                            isNil(formikProps.errors.cardHolder)
                              ? `rounded-none rounded-b-md mb-4 shadow-inner input bg-yellow-200 `
                              : `rounded-none rounded-b-md mb-4 shadow-inner input bg-yellow-200`
                          }
                          name="email"
                          placeholder="email@email.com"
                          type="text"
                         disabled
                        /></p> 
                        <span className="icon is-large is-left">
                          <i className="fas fa-user" />
                        </span>
                      </div>
                      {/*formikProps.errors.cardHolder &&
                  formikProps.touched.cardHolder ? (
                    <p className="help is-danger">
                      {formikProps.errors.cardHolder}
                    </p>
                  ) : null*/}
                    </div>
                  </div>

                  <div className="column is-four-fifths">
                    <div className="field">
                      <label className="label"><h1 className="font-bold">Proprietaire CB</h1></label>
                      <div className="control has-icons-left">
                      <p>  <Field

                         disabled={errorPay === 3 ?  true:false}
                          validate={validateName}
                          className={
                            isNil(formikProps.errors.cardHolder)
                              ? `rounded-none rounded-b-md mb-4 shadow-inner input `
                              : `rounded-none rounded-b-md mb-4 shadow-inner input  border-2 border-red-700`
                          }
                          name="cardHolder"
                          placeholder="Pippo Inzaghi"
                          type="text"
                        // onChange={handleChange}
                        /></p>
                        <span className="icon is-large is-left">
                          <i className="fas fa-user" />
                        </span>
                      </div>
                      {formikProps.errors.cardHolder &&
                        formikProps.touched.cardHolder ? (
                        <p className="help is-danger">
                          {formikProps.errors.cardHolder}
                        </p>
                      ) : null}
                    </div>
                  </div>


                  {/*!isUS ? (
                    <div className="column is-one-fifth">
                      <div className="field">
                        <label className="label">Zip / Postal Code</label>
                        <div className="control has-icons-left">
                          <Field
                                                   disabled={errorPay === 3 ?  true:false}

                            // validate={validateNaßßme}
                            className={
                              isNil(formikProps.errors.zip)
                                ? `rounded-none rounded-b-md mb-4 shadow-inner input `
                                : `rounded-none rounded-b-md mb-4 shadow-inner input`
                            }
                            name="zip"
                            placeholder="12345"
                            type="text"
                          // onChange={handleChange}
                          />
                          <span className="icon is-large is-left">
                            <i className="fas fa-map-marker-alt" />
                          </span>
                        </div>
                      </div>
                      {formikProps.errors.zip && formikProps.touched.zip ? (
                        <p className="help is-danger">{formikProps.errors.zip}</p>
                      ) : null}
                    </div>
                      ) : null*/}
                </div>

                <div className="">
                  <div className="">
                    <div> <label className="label"><h1 className="font-bold">Credit Card Details</h1></label></div>
                  <p>  <PaymentInputsWrapper 

                      {...wrapperProps}
                      styles={gt(width, 700) ? stylish2 : stylish}
                    >
                      <svg {...getCardImageProps({ images })} />
                      <Field name="cardNumber">
                        {({ field }) => (
                          <input                                              disabled={errorPay === 3 ?  true:false}
                          className=""
                            {...getCardNumberProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>
                      <Field name="expiryDate">
                        {({ field }) => (
                          <input                                              disabled={errorPay === 3 ?  true:false}

                            {...getExpiryDateProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>
                      <Field name="cvc">
                        {({ field }) => (
                          <input                                              disabled={errorPay === 3 ?  true:false}

                            {...getCVCProps({
                              onChange: field.onChange,
                              onBlur: field.onBlur
                            })}
                          />
                        )}
                      </Field>
                  
                    </PaymentInputsWrapper></p>
                  </div>
                </div>

                {!locationMetod() ? <div class="flex mt-2 mb-2">
                  <input onClick={() => {

                    remember()

                  }} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" defaultChecked={isRemember} id="flexCheckChecked" />
                  <label htmlFor="rememberMe" className="m-0 text-gray-400 text-sm">
                    Mémorisez pour mes futurs achats
                  </label></div>


                  : null}
                {cards}
                {errorPay !== 3
                
                ? <div className="">
                  <button className="validateCart " type="submit">
                    {!locationMetod() ? "Payer" : "Save Card"}
                  </button>
                </div> : null}</Form>
              {//  <Debug />

              }

            </React.Fragment>
          )}
        />
      </div>
    </div>
  );
}
export default StripeInput 
