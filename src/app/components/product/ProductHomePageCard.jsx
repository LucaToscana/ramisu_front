import React, { useState } from 'react';
//import { MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCol, MDBCardText } from 'mdbreact';
import { URL_PRODUCTS_DETAILS } from '../../shared/constants/urls/urlConstants';
import figurine from './../../assets/images/figurine.jpg';
import { useHistory } from 'react-router-dom';

/**
 * Contains the code to generate a card displaying the informations of a product.
 * 
 * @param {*} param0 
 * @returns a card containing the informations of the product
 * 
 * @author Cecile
 */
const ProductHomePageCard = ({ product, color }) => {

    const history = useHistory();

    return (

        <div class="w-full">
            <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div class="w-full bg-white rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
                        <div class="mb-8">
                            <img class="object-center object-cover " src={figurine} alt="product" />
                        </div>
                        <div class="text-center">
                            <p class="text-xl text-gray-400 font-normal mb-2">{product.universe.label}</p>
                            <p class="text-base text-black font-bold">{product.label}</p>
                            <p class="text-base text-white font-bold bg-black">{product.price} H.T.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default ProductHomePageCard;