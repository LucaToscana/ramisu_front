import React from 'react';
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

        <div className="w-full">
            {/*<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">*/}
            <div className="grid gap-2">
                <div className="w-full bg-gray-100 bg-opacity-50 rounded-lg sahdow-lg p-2 flex flex-col justify-center items-center">

                    {/* Product image */}
                    <div className="mb-2">
                        <img className="object-center pb-1/3 "
                            src={figurine}
                            alt="product"
                        />
                    </div>

                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-normal mb-1">{product.universeDAO.label}</p>
                        <p className="text-base text-black font-bold mb-1">{product.label}</p>
                    </div>

                    <p className="text-base text-white rounded font-bold bg-black pl-2 pr-2 m-1">{product.price} € H.T.</p>
                    <br />
                    <p className="btn bg-white text-black cursor-pointer" onClick={() => {
                        history.push(`/produits/detail/${product.id}`)
                    }}>Voir plus</p>
                </div>
            </div>
            {/*</section>*/}
        </div>
    )

}

export default ProductHomePageCard;