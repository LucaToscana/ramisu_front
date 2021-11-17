import React, { useEffect, useState } from 'react';
import { getNumberOfProductsByField } from "../api/backend/product";
import ProductHomePageCard from '../components/product/ProductHomePageCard';
import { hasRole } from './../shared/services/accountServices';
import { ROLE_ADMIN } from './../shared/constants/rolesConstant';
import { URL_ADMIN_HOME } from './../shared/constants/urls/urlConstants';
import Loader from './../shared/components/utils-components/Loader';
import handleHttpError from './../shared/components/form-and-error-components/HandleHttpError';


/**
 * The view file for the home page of the website
 * 
 * @param {*} param0 
 * @returns the view of the home page
 * 
 * @author Cecile
 */
const HomeView = ({ history }) => {

    const [productsRandom, setProductsRandom] = useState([]);
    const [productsPromotion, setProductsPromotion] = useState([]);
    const [productsTopSale, setProductsTopSale] = useState([]);
    const [loadingRandom, setLoadingRandom] = useState(true);
    const [loadingPromotion, setLoadingPromotion] = useState(true);
    const [loadingTopSale, setLoadingTopSale] = useState(true);

    useEffect(() => {
        getNumberOfProductsByField('random', 3)
            .then(response => {
                response.status === 200 && setProductsRandom(response.data);
                setLoadingRandom(false);
            })
            .catch((error, response) => {
                handleHttpError(error)
            })

        getNumberOfProductsByField('promotion', 3)
            .then(response => {
                response.status === 200 && setProductsPromotion(response.data);
                setLoadingPromotion(false);
            })
            .catch((error, response) => {
                handleHttpError(error)
            })

        getNumberOfProductsByField('topsale', 3)
            .then(response => {
                response.status === 200 && setProductsTopSale(response.data);
                setLoadingTopSale(false);
            })
            .catch((error, response) => {
                handleHttpError(error)
            })
    }, [])

    return (

        <div>
            <p className='text-primary-500 font-extrabold'>
                {loadingRandom ? < Loader /> :
                    <>
                        <div class="text-center pb-2">
                            <h class="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Notre boutique
                            </h>
                        </div>
                        <div class="w-full bg-custom-lightbrown">
                            <section class="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsRandom.map((product) =>
                                        <ProductHomePageCard product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
                <br />

                {loadingPromotion ? < Loader /> :
                    <>
                        <div class="text-center pb-2">
                            <h class="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Nos promotions
                            </h>
                        </div>
                        <div class="w-full bg-custom-orange">
                            <section class="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsPromotion.map((product) =>
                                        <ProductHomePageCard product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
                <br />
                {loadingTopSale ? < Loader /> :
                    <>
                        <div class="text-center pb-2">
                            <h class="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Les tops ventes
                            </h>
                        </div>
                        <div class="w-full bg-custom-green">
                            <section class="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsTopSale.map((product) =>
                                        <ProductHomePageCard product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
            </p>



            {/* hasRole(ROLE_ADMIN) && (
                <button className="btn btn-primary" onClick={() => history.push(URL_ADMIN_HOME)}>
                    Admin
                </button>
            )*/}
        </div>
    );

}

export default HomeView;
