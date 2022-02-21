import React from "react";
import { DocumentDownloadIcon, SwitchHorizontalIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import ProductRelated from "../../product/components-page-product/ProductRelated";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import logo from "../../../assets/images/icones/logo/warhammer-shop-logo.png";
import { Link } from "react-router-dom";
import { URL_ORDER_RETURN } from "../../../shared/constants/urls/urlConstants";
import OrderDetailsTable from "./OrderDetailsTable";


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
                        <div className="container-stepper ">


                            <div className={status === "En cours de traitement" ? "step active" : "step completed"}>
                                <div class="v-stepper">
                                    <div className="circle"></div>
                                    <div className="line"></div>
                                </div>

                                <div className={status === "En cours de traitement" ? "content-active" : "content"}>
                                    En cours de traitement
                                </div>
                            </div>
                            {status !== "En cours de traitement" ?
                                <div className={status === "Prêt a expédier" ? "step active" : "step completed"}>
                                    <div className="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className={status === "Prêt a expédier" ? "content-active" : "content"}>
                                        Prêt a expédier                           </div>
                                </div>
                                : <div className="step">
                                    <div class="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className="content">
                                        Prêt a expédier
                                    </div>
                                </div>}


                            {status !== "En cours de traitement" && status !== "Prêt a expédier" ?


                                <div className={status === "Livraison en cours" ? "step active" : "step completed"}>

                                    <div className="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className={status === "Livraison en cours" ? "content-active" : "content"}
                                    >
                                        Livraison en cours
                                    </div>
                                </div> : <div className="step">
                                    <div className="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className="content">
                                        Livraison en cours
                                    </div>
                                </div>}

                            {status === "Livre" ? <div class="step completed">
                                <div className="v-stepper">
                                    <div className="circle"></div>
                                    <div className="line"></div>
                                </div>

                                <div className="content-active">
                                    Livré
                                </div>
                            </div>
                                : <div className="step">
                                    <div className="v-stepper">
                                        <div className="circle"></div>
                                        <div className="line"></div>
                                    </div>

                                    <div className="content">
                                        Livré
                                    </div>
                                </div>}
                            {status !== "Annule" ?
                                <Link to={{
                                    pathname: URL_ORDER_RETURN,
                                    state: {
                                        orderId: id,
                                        date: date,
                                        status: status,
                                        productsOrder: productsOrder,
                                        total: total,
                                        address: address,
                                        subTotal: subTotal
                                    }
                                }}>
                                    <button className="w-full ml-2"><div className="mt-8 font-bold   "

                                    >


                                        <div > <p className="mb-2">Voulez-vous faire un retour?</p>

                                            <p className="mb-2">Or  annuler une commande?</p>
                                            <p className="mb-2">Contactez-nous!
                                            </p> <div className="mt-5 flex justify-center ">  <SwitchHorizontalIcon className="w-8 h-8"></SwitchHorizontalIcon></div>
                                        </div>



                                    </div></button></Link>
                                : null}
                        </div>
                    </>}
                </div>



                <div className="  col-span-4 p-3 mt-10 ml-12 lg:w-full ">
                    <OrderDetailsTable productsOrder={productsOrder} total={total} status={status} address={address} subTotal={subTotal} />


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