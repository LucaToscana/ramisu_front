import React, { useState } from "react";
import { CheckIcon, DocumentDownloadIcon, XIcon } from '@heroicons/react/solid';
import ProductRelated from "../product/components-page-product/ProductRelated";
import { jsPDF } from "jspdf";


const OrderDetails = ({ id, order, productsOrder, total, status, date, address }) => {

    const pdf = () => {
        const doc = new jsPDF();
        var data = [
            {name: "Bar", amount: 1200}, 
            {name: "Zap", amount: 200}, 
            {name: "Foo", amount: 320}];
            
          var total = data.reduce((sum, el) => sum + el.amount, 0);
        
          
        
          doc.save("table.pdf");
        doc.save("a4.pdf"); // will save the file in the current working directory
    }

    return (

        <div className="">


            <div className="  grid grid-cols-5 lg:flex lg:flex-row   ">
                <div className="mt-3 grid  content-around  ">
                    <h1 className="font-bold text-2xl mt-4 pl-2">Order id: {id}</h1>
                    <h2 className="font-bold text-1xl pl-2 mt-4"> {date}</h2>
                    <div className="flex justify-start pl-2 font-bold   mb-5">Telecharger  PDF
                        <button onClick={() => pdf()}> <DocumentDownloadIcon className="h-8 w-8 p-0 p-0" ></DocumentDownloadIcon></button></div>

                    <div class="container-stepper ">
                        <div className={status === "En cours de traitement" ? "step active" : "step completed"}>
                            <div class="v-stepper">
                                <div class="circle"></div>
                                <div class="line"></div>
                            </div>

                            <div className={status === "En cours de traitement" ? "content-active" : "content"}>
                                En cours de traitement
                            </div>
                        </div>
                        {status !== "En cours de traitement" ?
                            <div className={status === "Prêt a expédier" ? "step active" : "step completed"}>
                                <div class="v-stepper">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                </div>

                                <div className={status === "Prêt a expédier" ? "content-active" : "content"}>
                                    Prêt a expédier                           </div>
                            </div>
                            : <div className="step">
                                <div class="v-stepper">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                </div>

                                <div class="content">
                                    Prêt a expédier
                                </div>
                            </div>}


                        {status !== "En cours de traitement" && status !== "Prêt a expédier" ?


                            <div className={status === "Livraison en cours" ? "step active" : "step completed"}>

                                <div class="v-stepper">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                </div>

                                <div className={status === "Livraison en cours" ? "content-active" : "content"}
                                >
                                    Livraison en cours
                                </div>
                            </div> : <div className="step">
                                <div class="v-stepper">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                </div>

                                <div class="content">
                                    Livraison en cours
                                </div>
                            </div>}

                        {status === "Livre" ? <div class="step completed">
                            <div class="v-stepper">
                                <div class="circle"></div>
                                <div class="line"></div>
                            </div>

                            <div class="content-active">
                                Livré
                            </div>
                        </div>
                            : <div class="step">
                                <div class="v-stepper">
                                    <div class="circle"></div>
                                    <div class="line"></div>
                                </div>

                                <div class="content">
                                    Livré
                                </div>
                            </div>}

                    </div>

                </div>



                <div className="  col-span-4 p-3 mt-10 ml-12 lg:w-full ">


                    <div className='  border-b-2 border-gray-400 cartCard h-full p-5 ml-5 mt-5'>
                        <div class="grid grid-cols-3 gap-2 w-full p-1 	">
                            <div className='w-full'>  <h1 className='font-bold text-1xl '> Article:</h1></div>
                            <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> prix</h1></div>

                            <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> quantite</h1></div>

                            {productsOrder !== undefined ? productsOrder.map(cart => <>
                                <div className='w-full'><p className='text-sm '> {cart.label}</p></div>
                                <div className='w-full text-center'><p className='text-sm '> {cart.price}</p></div>

                                <div className='w-full text-center'><p className='text-sm '> {cart.quantite}</p></div></>) : null}
                        </div>

                        <div class="grid grid-cols-3 gap-2 w-full p-3  border-t-2 border-gray-400 	">

                            <div className='w-full'><p className='text-sm '> Sous-total</p></div>
                            <div className='w-full text-center'><p className='text-sm '> </p></div>
                            <div className='w-full text-center'><p className='text-sm '> {total / 1.2}</p></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><p className='text-sm '> Livraison</p></div>
                            <div className='w-full text-center'><p className='text-sm '> </p></div>
                            {(total * 1.2) < 25 ? <div className='w-full text-center'><p className='text-sm '> 10 €</p></div>
                                : <div className='w-full text-center'><p className='text-sm '> gratuit</p></div>}
                        </div>
                        <div className='flex border-b-2 border-gray-400 p-4 mr-5 ml-5 mt-1 mb-1'>
                            <h1 className='flex items-end font-bold text-4xl '></h1>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><h1 className='flex items-end font-bold text-1xl'>
                                Total (TVA incluse)</h1></div>
                            <div className='w-full text-center'><p className='text-sm font-bold  '> </p></div>
                            {<div className='w-full text-center'><p className='text-sm font-bold '> {(total)}€</p></div>



                            }
                        </div>

                        <p className="font-bold text-sm mt-4">Status: {status}</p>
                        <p className="font-bold text-sm mt-4">Addresse: {address}</p>



                    </div>

                </div>


                <div>

                </div>

            </div> <div className=" mt-10 flex flex-wrap w-96  md:grid grid-cols-6 justify-between w-full  lg:w-full  ">
                {productsOrder !== undefined ? productsOrder.map((element, index) => <>
                    {
                        index < 6 ?
                            <ProductRelated product={element} />
                            : null}</>



                ) : null}

            </div>






        </div>

    );
};

export default OrderDetails;