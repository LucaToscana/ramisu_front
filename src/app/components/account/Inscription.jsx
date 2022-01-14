import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { defaulValuesInscription, defaulValuesLogin } from '../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';
import { schemaFormInscription } from '../../shared/constants/formik-yup/yup/yupUser';
import ErrorMessSmall from '../../shared/components/form-and-error-components/ErrorMessSmall';
import { CustomCheckbox, CustomInput } from '../../shared/components/form-and-error-components/InputCustom';
import AddressInput from './AddressInput';
import DatePickerField from '../../shared/components/form-and-error-components/DatePickerField';
import "react-datepicker/dist/react-datepicker.css";



/**
 * Component Form Login
 * Use Formik to create the Form
 * 
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 * @author Peter Mollet
 */

const FormInscription = ({ submit, errorLog, address, localAddress }) => (


    <Formik enableReinitialize={true}
        initialValues={defaulValuesInscription} onSubmit={submit} validationSchema={schemaFormInscription}>
        <Form className='m-8'>
            <div className='rounded-md shadow-sm -space-y-px'>
                <label className="mb-2">Nom</label>
                <Field type="text" name="nom"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />


                <label className="mb-2">Prenom</label>
                <Field type='text' name='prenom'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


                <label className="mb-2">Anniversaire</label>
                <DatePickerField name="anniversaire" />




                <label className="mb-2">Mail</label>
                <Field type="text" name="email"
                    component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />


                <label className="mb-2">
                    <div className='flex '>
                        <div className='p-1'>

                            <svg class="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                        </div><div>   Adresse</div> </div> </label>

                <div className='grid grid-cols-1 justify-items-center	'>

                    <AddressInput></AddressInput>

                </div>

                <div className='grid grid-cols-3  gap-2	'>


                    <div className='grid grid-cols-1 justify-items-center	'>

                        <label className="mb-2">Numero Rue</label>
                        <Field type="text" name="numeroA"
                            component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />
                    </div>
                    <div className='grid grid-cols-1 justify-items-stretch col-span-2 w-full	'>
                        <label className="mb-2">Rue</label>
                        <Field type='text' name='rue'
                            component={CustomInput} className=' rounded-none rounded-b-md mb-4 shadow-inner' noError />
                    </div>

                    <div className='grid grid-cols-1 justify-items-center	'>

                        <label className="mb-2">Code Postal</label>
                        <Field type='text' name='codepostal'
                            component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />

                    </div>
                    <div className='grid grid-cols-1 justify-items-center	'>

                        <label className="mb-2">Ville</label>
                        <Field type="text" name="ville"
                            component={CustomInput} className='rounded-none rounded-t-md mb-4 shadow-inner' noError />

                    </div>

                    <div className='grid grid-cols-1 justify-items-center	'>
                        <label className="mb-2">Pays</label>
                        <Field type='text' name='pays'
                            component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />

                    </div>

                </div>
                <div className='grid grid-cols-1 justify-items-center	justify-items-stretch '>

                    <label className="mb-2">Complement Address</label>
                    <Field type='text' name='complementadresse'
                        component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />
                </div>


                <label className="mb-2">Telephone</label>
                <Field type='text' name='telephone'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


                <label className="mb-2">Password</label>
                <Field type='text' name='password'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


                <label className="mb-2">Password Test</label>
                <Field type='text' name='passwordTest'
                    component={CustomInput} className='rounded-none rounded-b-md mb-4 shadow-inner' noError />


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
const Inscription = (props) => {

    const isMyAddress = () => {

        var myAddress = {
            street_number: "",
            route: "",
            country: "",
            locality: "",
            postal_code: ""
        }
        if (localStorage.getItem("myAddress")) {
            return JSON.parse(localStorage.getItem("myAddress"))
        } else { return myAddress }
    }

 
    const localAddress = isMyAddress()

    return (
        <div className='mt-10 md:w-1/2 md:border-2 md:shadow-2xl'>
            <div>
                <h2 className="text-center font-bold uppercase md:mt-8">
                    Inscription
                </h2>
            </div>

            {<FormInscription localAddress={localAddress}  {...props} />
            }
        </div>
    );
};

export default Inscription;