import React, { useState } from "react";
import { CheckIcon, DocumentDownloadIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import ProductRelated from "../product/components-page-product/ProductRelated";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import logo from "../../assets/images/icones/logo/warhammer-shop-logo.png";


const OrderDetails = ({ id, productsOrder, total, status, date, address, profile, subTotal }) => {

    const addrString = () => {
        var s = new String(address);
        return s.toLocaleUpperCase()
    }


    const liv = () => {
        if (subTotal * 1.2 < 25) { return 10 + "€" } else { return "OFFERT" }
    }
    const pdf = () => {
        const addressClient = address + ""
        const doc = new jsPDF();
        doc.setFontSize(12);

        doc.text("Warhammer Market", 5, 10);
        doc.text("Siret:789456123789", 5, 15);
        doc.text("N° TVA:FR789878978789", 5, 20);


        doc.text("Order: " + id, 10, 30);
        doc.text("Date: " + date, 10, 35);
        doc.text("Client: " + profile, 10, 40);
        doc.text("Livraison: " + "(a domicile)", 10, 45);

        doc.text(addrString(), 10, 50);




        doc.addImage(logo, 'PNG', 85, 5, 50, 20);
        doc.output('datauri');
        const columns = ["Label", "Prix unitaire HT", "Quantite", "Prix Total HT"];
        const rows = [];
        // here you go trought the arary products pushing only the values to the rows array
        productsOrder.map(item => {
            const totRow = (+ item.price * +item.quantite)
            const row = {
                label: item.label,
                price: item.price + "€",
                quantite: item.quantite,
                totRow: totRow + "€",


            }
            rows.push(Object.values(row))
        })

        doc.autoTable(columns, rows, {

            styles: {
                fontSize: 12
            },
            startY: 70,
        })
        const columns2 = ["TOT HT", "TOT TVA", "LIVRAISON", "TOT"];
        const rows2 = [];

        const row2 = {
            Totht: (subTotal).toFixed(2) + "€",
            TotalTVA: (subTotal * 0.2).toFixed(2) + "€",
            Livraison: liv(),
            Total: total.toFixed(2) + "€",
        }
        rows2.push(Object.values(row2))

        doc.autoTable(columns2, rows2, {

            styles: {
                fontSize: 12
            },
            startY: doc.lastAutoTable.finalY + 10,
        })




        doc.save(id + "-" + date + ".pdf"); // will save the file in the current working directory
    }

    return (

        <div className="">


            <div className="  grid grid-cols-5 lg:flex lg:flex-row   ">

                <div className="mt-3 grid  content-start  ml-1 ">
                    <h1 className="font-bold text-2xl mt-4 pl-2">Order id: {id}</h1>
                    <h2 className="font-bold text-1xl pl-2 mt-4"> {date}</h2>
                    {status !== "Annule" ? <div className="flex justify-start pl-2 font-bold   mb-5">Telecharger  PDF
                        <button onClick={() => pdf()}> <DocumentDownloadIcon className="h-8 w-8 p-0 p-0" ></DocumentDownloadIcon></button></div>
                        : null}

                    {status === "Annule" ? <div className="mt-5"><XCircleIcon className="h-8 w-8"></XCircleIcon>La commande a été annulée</div> : <>
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
                    </>}
                </div>



                <div className="  col-span-4 p-3 mt-10 ml-12 lg:w-full ">


                    <div className='  border-b-2 border-gray-400 cartCard2 h-full p-5 ml-5 mt-5 text-xs lg:text-sm'>
                        <div class="grid grid-cols-5 gap-4 w-full p-1 	">
                            <div className='w-full col-span-2'>  <h1 className='font-bold text-1xl '> Article</h1></div>
                            <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix HT €</h1></div>
                            <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix €</h1></div>

                            <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> Qte</h1></div>

                            {productsOrder !== undefined ? productsOrder.map(cart => <>
                                <div className='w-full col-span-2'><p className='text-xs'> {cart.label}</p></div>
                                <div className='w-full text-center'><p className='text-xs '> {(cart.price * 1).toFixed(2)}</p></div>
                                <div className='w-full text-center'><p className='text-xs '> {(cart.price * 1.2).toFixed(2)}</p></div>

                                <div className='w-full text-center'><p className='text-xs '> {cart.quantite}</p></div></>) : null}
                        </div>

                        <div class="grid grid-cols-3 gap-2 w-full p-3  border-t-2 border-gray-400 	">

                            <div className='w-full'><p className='text-xs'> Sous-total HT</p></div>
                            <div className='w-full text-center'><p className='text-xs '> </p></div>
                            <div className='w-full text-center'><p className='text-xs'> {(subTotal * 1).toFixed(2)}€</p></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3  	">

                            <div className='w-full'><p className='text-xs '> Sous-total </p></div>
                            <div className='w-full text-center'><p className='text-xs'> </p></div>
                            <div className='w-full text-center'><p className='text-xs '> {(subTotal * 1.2).toFixed(2)}€</p></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><p className='text-xs'> Livraison  TTC</p></div>
                            <div className='w-full text-center'><p className='text-xs'> </p></div>
                            {(total * 1.2) < 25 ? <div className='w-full text-center'><p className='text-xs'> 10 €</p></div>
                                : <div className='w-full text-center'><p className='text-xs'> gratuit</p></div>}
                        </div>
                        <div className='flex border-b-2 border-gray-400 p-4 mr-5 ml-5 mt-1 mb-1'>
                            <h1 className='flex items-end font-bold text-4xl '></h1>
                        </div>
                        <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                            <div className='w-full'><h1 className='flex items-end font-bold text-1xl'>
                                Total (TTC)</h1></div>
                            <div className='w-full text-center'><p className='text-xs font-bold  '> </p></div>
                            {<div className='w-full text-center'><p className='text-xsfont-bold '> {((total * 1).toFixed(2))}€</p></div>



                            }
                        </div>

                        <p className="font-bold text-xs mt-4">Status: {status}</p>
                        <p className="font-bold text-xs mt-4">Addresse: {address}</p>



                    </div>

                </div>


                <div>

                </div>

            </div>


            <div className="grid justify-items-center">
                <div className=" mt-10 flex flex-wrap w-96  md:grid grid-cols-6 justify-between w-full  lg:w-full  ">
                    {productsOrder !== undefined ? productsOrder.map((element, index) => <>
                        {
                            index < 100 ?
                                <ProductRelated product={element} />
                                : null}</>



                    ) : null}

                </div></div>






        </div>

    );
};

export default OrderDetails;