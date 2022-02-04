
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useEffect } from 'react';
import { contactUs } from '../api/backend/user';
const ContactView = ()=>
{

    const initObj = {subject:'', message:''};
    const validator = Yup.object().shape({
                        subject:  Yup.string().required("Required input"),
                        message: Yup.string().required("Veuillez saisir votre message").min(5, "Doit contenir au moins 5 caractères").max(1024, "Doit contenir maximum de 1024 charactères")
                    });

    const [msgLen , setMgsLen] = useState(0);
    const [status , setStatus] = useState(0);
    const [feedback , setFeedback] = useState("");


        useEffect(()=>{
            document.getElementById("selector").selectedIndex = 0;
        },[]);



    const submitHandler = (values)=>
    {
        setStatus(true);
        setFeedback("Envoi de votre message");
        contactUs(values).then(res=>{
            setFeedback("Merci pour vote message, nous vous reponderons très prochainement.");
            // console.log("response" , res);
        });
        
    }

    return (<div className='bg-white'>
                <h2 className='text-center mt-5 p-5'>Nous contacter</h2>
                {status ? (<h2 className="text-center">{feedback}</h2>) : ( 
                <Formik
                    initialValues={initObj}
                    validationSchema= {validator}
                    onSubmit={submitHandler}>
                          {({ values, handleSubmit ,  handleChange, errors }) => (
                        <form className='md:w-1/2 m-8 flex flex-col p-10 bg-white  items-center md:border-2 md:shadow-2xl m-auto' > 
                            <div className='w-full'>
                                <label>Sujet</label>
                            </div>
                                <select id="selector" name="subject" className='rounded w-full' value={values.subject}   onChange={handleChange}>
                                    <option value="default">Choisir un sujet</option>
                                    <option value="askuser">Une question à propos de votre compte utilisateur</option>
                                    <option value="askcomm">Une question d'ordre commercial</option>
                                    <option value="askadm">Vous avez constaté un bug sur le site</option>
                                </select>
                                {errors.subject!=undefined &&
                                    <div className="text-red-900">
                                            {errors.subject}
                                    </div>
                                    }
                                <div className='w-full mt-5'>
                                <label>Votre message</label>
                                {errors.message!=undefined &&
                                    <div className="text-red-900">
                                            {errors.message}
                                    </div>
                                    }
                            </div>
                                <textarea   value={values.message} 
                                            name="message" 
                                            placeholder="Write something.." 
                                            className='h-[200px] mt-1 rounded w-full' 
                                            onChange={e=>{
                                                    handleChange(e);
                                                    console.log(e.currentTarget.value.length);
                                                    setMgsLen(e.currentTarget.value.length);
                                                }
                                            }></textarea>
                                {msgLen>5 && (<span className='text-sm text-gray-600 text-center'>{msgLen}  / 1024<br/>caractères maximum</span>)}
                                <div className='w-full flex justify-end'>
                                <input  type="button" 
                                        onClick={handleSubmit} 
                                        value="Envoyer"  
                                        className="rounded-xl login font-bold mt-5 hover:cursor-pointer"  />
                                </div>
                        </form>
                          )}
                </Formik>)}
            </div>)

}



export default ContactView;