
import React, { useEffect, useState, forwardRef } from 'react';

import { Formik, Form, Field, useFormikContext } from 'formik';
import { CustomInput } from '../../../shared/components/form-and-error-components/InputCustom';

import { schemaFormProfileUpdate } from '../../../shared/constants/formik-yup/yup/yupUser';

// import DatePicker from "react-datepicker";
import DatePickerField from '../../../shared/components/form-and-error-components/DatePickerField'
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/datepickerprofile.css"

import PictureForm from './ProfilePictureForm';

import { PlusCircleIcon, PencilIcon, UserIcon, CheckCircleIcon, RefreshIcon, XCircleIcon } from '@heroicons/react/solid'
const Profile = (props) => {




    return (
        <div className='p-5'>

            <h1 className="font-semibold text-center text-2xl flex justify-center items-center mb-5">
                <UserIcon className="h-6 w-6 inline mr-3" />
                <span>Données du compte</span>
            </h1>
            <div className='flex justify-center flex-col md:flex-row'>
                <Formik
                    initialValues={props.data}
                    enableReinitialize={true}
                    onSubmit={props.submit}
                    validationSchema={schemaFormProfileUpdate}>

                    {({ setFieldValue, errors }) => (

                        <Form className='w-full md:w-3/4 lg:w-1/2'>

                            <Fieldset data={props.data} setFieldValue={setFieldValue} errors={errors} />


                        </Form>

                    )}
                </Formik>
                <PictureForm data={props.data} />
            </div>
        </div>
    );
};



const Fieldset = (props) => {


    const { submitForm } = useFormikContext();


    const handleSubmit = (event) => {
        submitForm();
    }


    return (
        <fieldset className=''>

            <FormRow label="Nom&nbsp;:&nbsp;"
                formName="firstName"
                value={props.data.first}
                onSubmit={handleSubmit}
                setFieldValue={props.setFieldValue}
                error={props.errors['firstName']}
            />



            <FormRow label="Prénom&nbsp;:&nbsp;"
                formName="lastName"
                value={props.data.lastName}
                onSubmit={handleSubmit}
                setFieldValue={props.setFieldValue}
                error={props.errors['lastName']}
            />

            <FormRow label="Tél&nbsp;:&nbsp;"
                formName="phone"
                value={props.data.phone}
                onSubmit={handleSubmit}
                setFieldValue={props.setFieldValue}
                error={props.errors['phone']}
            />

            <FromRowDate
                label="Date de naissance&nbsp;:&nbsp;"
                name="birthdate"
                value={props.data.birthdate}
                onSubmit={handleSubmit}
                error={props.errors['birthdate']}
            />



            <FormRow
                label="N°&nbsp;:&nbsp;"
                formName="number"
                value={props.data.number}
                onSubmit={handleSubmit}
                error={props.errors['number']}
                setFieldValue={props.setFieldValue}
            />

            <FormRow
                label="Rue°&nbsp;:&nbsp;"
                formName="street"
                value={props.data.street}
                onSubmit={handleSubmit}
                error={props.errors['street']}
                setFieldValue={props.setFieldValue}
            />

            <FormRow label="Ville&nbsp;:&nbsp;"
                formName="city"
                value={props.data.city}
                error={props.errors['city']}
                onSubmit={handleSubmit}
                setFieldValue={props.setFieldValue}
            />


            <FormRow label="Code postal&nbsp;:&nbsp;"
                formName="postalCode"
                value={props.data.postalCode}
                onSubmit={handleSubmit}
                error={props.errors['postalCode']}
                setFieldValue={props.setFieldValue}
            />

            <FormRow label="Pays&nbsp;:&nbsp;"
                formName="country"
                value={props.data.country}
                onSubmit={handleSubmit}
                error={props.errors['country']}
                setFieldValue={props.setFieldValue}
            />

        </fieldset>
    );

}


const FormRow = (props) => {


    const inputDisable = 'text-right  w-full bg-transparent border-0';
    const inputEnable = 'text-right  w-full bg-white  border-1';


    const [isEnable, setEnabled] = useState(false);
    const [inputField, setInputField] = useState(undefined);


    const styleShowBtn = 'ml-2 mt-2';
    const styleHideBtn = 'ml-2 hidden';


    useEffect(() => {

        // console.log(props.error)
        if (isEnable && inputField != undefined) {
            inputField.focus();
        }
    }, [isEnable])


    const toggle = (target) => {


        if (inputField == undefined) setInputField(target.parentNode.parentNode.childNodes[1].firstChild);// input Field
        setEnabled(!isEnable);

    }



    const keyHandler = (event) => {
        if (event.key == "Escape" || event.key == "Enter") {
            toggle(inputField.parentNode.parentNode.childNodes[2].firstChild);// retargeting

            if (event.key == "Escape") {
                props.setFieldValue(props.formName, props.value);
            } else {  //Enter
                props.onSubmit();
            }
        }
    }


    return (<div className="m-2 p-2 flex justify-between items-center border-b-2">






        <label className="md:w-1/4 w-1/2 text-right " >{props.label}  </label>

        <Field
            type="text"
            disabled={!isEnable}
            name={props.formName}
            onKeyDown={keyHandler}
            component={CustomInput}
            className={isEnable ? inputEnable : inputDisable}
        />


        <div>


            <button
                onClick={(event) => toggle(event.currentTarget)}
                type='button'
                className={!isEnable ? styleShowBtn : styleHideBtn}  >
                <PencilIcon className="h-6 w-6" />
            </button>

            <button type='button'
                className={props.error != undefined ? styleShowBtn : styleHideBtn} >
                <RefreshIcon className="h-6 w-6" />
            </button>

            <button type='button'
                onClick={(event) => {
                    toggle(event.currentTarget);
                    props.onSubmit();
                }}
                className={isEnable ? styleShowBtn : styleHideBtn}  >
                <CheckCircleIcon className="h-6 w-6" />
            </button>

            <button type='button'
                onClick={(event) => {

                    toggle(event.currentTarget);
                }}
                className={isEnable ? styleShowBtn : styleHideBtn}  >

                <XCircleIcon className="h-6 w-6" />
            </button>



        </div>

    </div>
    );
}


const FromRowDate = (props) => {

    const styleShowBtn = 'ml-2  ';
    const styleHideBtn = 'ml-2 hidden';
    const styleOpen = 'text-right bg-white border-1 w-3/4 md:w-min';
    const styleClose = 'text-right flex-none bg-transparent border-0  w-full md:w-min';

    const [isOpen, setIsOpen] = useState(false);

    const onFocusChange = (event) => {
        setIsOpen(true);
    }


    const blurHandler = (event) => {
        setIsOpen(false);
    }


    const resetState = (parent) => {
        setIsOpen(false);
    }


    const openDatePicker = (event) => {
        event.currentTarget.parentNode.parentNode.childNodes[1].firstChild.firstChild.focus();
    }

    return (
        <div className="m-2 p-2 flex justify-between items-stretch items-center border-b-2">
            <label className="md:w-1/4 w-1/3 text-right  flex-none border-1" >{props.label}  </label>
            <DatePickerField
                defaultValue={props.value}
                name={props.name}
                className={isOpen ? styleOpen : styleClose}

                onFocus={onFocusChange}
                onBlur={blurHandler}
                onClickOutside={blurHandler} />

            <div className="btn-form flex-none">

                <button
                    onClick={(event) => openDatePicker(event)}
                    type='button'
                    className={isOpen ? styleHideBtn : styleShowBtn} >
                    <PencilIcon className="h-6 w-6" />
                </button>

                <button type='button'
                    onClick={(event) => {
                        resetState(event)
                        props.onSubmit();
                    }}
                    className={isOpen ? styleShowBtn : styleHideBtn}  >
                    <CheckCircleIcon className="h-6 w-6" />
                </button>

                <button type='button' onClick={(event) => resetState(event)} className={isOpen ? styleShowBtn : styleHideBtn}  >
                    <XCircleIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

export default Profile;