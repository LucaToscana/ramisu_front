import React from 'react';
import { Formik, Form, Field } from 'formik';
import { defaulValuesRegistration } from '../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormRegistration } from '../../shared/constants/formik-yup/yup/yupUser';
import ErrorMessSmall from '../../shared/components/form-and-error-components/ErrorMessSmall';
import {  CustomInput } from '../../shared/components/form-and-error-components/InputCustom';
import AddressInput from '../../shared/components/form-and-error-components/AddressInput';
import DatePickerField from '../../shared/components/form-and-error-components/DatePickerField';
import "react-datepicker/dist/react-datepicker.css";



/**
 * Registration form
 * 
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Peter Mollet / Luca Toscana / Malek Mokrani
 */

const RegistrationFrom = ({ submit, errorLog }) => (


    <Formik enableReinitialize={true}
            initialValues={defaulValuesRegistration} 
            onSubmit={submit} 
            validationSchema={schemaFormRegistration}
            >
        <Form className='m-8'>
            <div className='rounded-md shadow-sm -space-y-px'>
                <label className="mb-2">Nom</label>
                <Field type="text" name="firstName"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner'  noError/>


                <label className="mb-2">Prenom</label>
                <Field type='text' name='lastName'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner'  noError/>


                <label className="mb-2">Anniversaire</label>
                <DatePickerField name="birthdate" />




                <label className="mb-2">Mail</label>
                <Field type="text" name="mail"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />


                <label className="mb-2">
                    <div className='flex '>
                        <div className='p-1'>

                            <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                        </div><div>   Adresse</div> </div> </label>

                <div className='grid grid-cols-1 justify-items-center	'>

                    <AddressInput></AddressInput>

                </div>

                <div className='grid grid-cols-3  gap-2	'>
                    <div className='grid grid-cols-1 justify-items-center	'>

                        <label className="mb-2">Numero Rue</label>
                        <Field  type="text" name="number"
                                component={CustomInput} 
                                className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
                    </div>

                    <div className='grid grid-cols-1 justify-items-stretch col-span-2 w-full'>
                        <label className="mb-2">Rue</label>
                        <Field  type='text' name='street'
                                component={CustomInput} 
                                className=' rounded-none rounded-b-md mb-4 shadow-inner' noError />
                    </div>

                    <div className='grid grid-cols-1 justify-items-center'>
                        <label className="mb-2">Code Postal</label>
                        <Field  type='text' name='postalCode'
                                component={CustomInput} 
                                className='rounded-none rounded-b-md mb-4 shadow-inner' noError />
                    </div>

                    <div    className='grid grid-cols-1 justify-items-center	'>
                            <label className="mb-2">Ville</label>
                            <Field  type="text" name="city"
                                    component={CustomInput} 
                                    className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
                    </div>

                    <div className='grid grid-cols-1 justify-items-center'>
                        <label className="mb-2">Pays</label>
                        <Field  type='text' name='country'
                                component={CustomInput} 
                                className='rounded-none rounded-b-md mb-4 shadow-inner' noError  />
                    </div>
                </div>


                <div className='grid grid-cols-1 justify-items-center	justify-items-stretch '>

                    <label className="mb-2">Complement Address</label>
                    <Field  type='text' 
                            name='additionalAddress'
                            component={CustomInput} 
                            className='rounded-none rounded-b-md mb-4 shadow-inner' noError />
                </div>


                <label className="mb-2">Telephone</label>
                <Field  type='text' name='phone'
                        component={CustomInput} 
                        className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


                <label className="mb-2">Password</label>
                <Field type='password' name='password'
                        component={CustomInput} 
                        className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


                <label className="mb-2">Password Test</label>
                <Field type='password' name='passwordTest'
                        component={CustomInput} 
                        className='rounded-none rounded-b-md mb-4 shadow-inner' noError />
            </div>






            <div className="flex justify-center">
                <button type="submit" className="rounded-xl login font-bold">
                    S'inscrire
                </button>
            </div>
            {/*????????email*/errorLog && <ErrorMessSmall middle message="Identifiants incorrect(s)" />}
        </Form>
    </Formik>
)

/**
 * Component Login
 * 
 * will need in props:
 *  - Submit Function
 *  - errorLog boolean
 *  - validationSchema
 * 
 * See above for information
 * 
 * @author Luca Toscana
 */
const RegisterView = (props) => {



    return (
        <div className='mt-10 md:w-1/2 md:border-2 md:shadow-2xl'>
           
                <h2 className="text-center font-bold uppercase md:mt-8">
                    Inscription
                </h2>
            

            {<RegistrationFrom  {...props} /> }
        </div>
    );
};

export default RegisterView;