import React, { useEffect, useState } from 'react';
import { getNumberOfProductsByField, productSearchCriteria } from "../api/backend/product";
import ProductHomePageCard from '../components/product/ProductHomePageCard';
// import { hasRole } from './../shared/services/accountServices';
// import { ROLE_ADMIN } from './../shared/constants/rolesConstant';
// import { URL_ADMIN_HOME } from './../shared/constants/urls/urlConstants';
import Loader from './../shared/components/utils-components/Loader';
import handleHttpError from './../shared/components/form-and-error-components/HandleHttpError';
import apiBackEnd from '../api/backend/api.Backend';


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

        if( !localStorage.getItem("filters")){

            localStorage.setItem("filters",JSON.stringify({
        
                label: "",
                price: null,
                universe: null,
                category: null,
                tag: null,
                page: 0,
                pageSize: 9,
                total: 0,
                totalpage: [],
                minPrice: 0,
                maxPrice: 10000
            
            
            }))
        }
        if (localStorage.getItem("successPaiement")) {

            localStorage.removeItem("successPaiement")

        }

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
            }


            )
            .catch((error, response) => {
                handleHttpError(error)
            })
    }, [])

    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default pb-8">
            <hr />
            <div id="carouselExampleIndicators" class="carousel slide relative" data-bs-ride="carousel">
<<<<<<< HEAD
                <div class="carousel-indicators absolute right-0 bottom-70 left-0 flex justify-center p-0 mb-4">
=======
                <div class="carousel-indicators absolute right-0 bottom-30 left-0 flex justify-center p-0 mb-4 ">
>>>>>>> 5c8c02e (carousel plus proprement intégré à la page)
                <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
                ></button>
                <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                ></button>
                <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                ></button>
                </div>
                <div class="carousel-inner relative w-full overflow-hidden">
                <div class="carousel-item active float-left w-full">
                <img
                    src="..\assets\images\carousel01"
                    class="block w-full"
                    alt="Warhammer001"
                />
                </div>
                <div class="carousel-item float-left w-full">
                <img
                    src="..\assets\images\carousel02"
                    class="block w-full"
                    alt="Warhammer002"
                />
                </div>
                <div class="carousel-item float-left w-full">
                <img
                    src="..\assets\images\carousel03"
                    class="block w-full"
                    alt="Warhammer003"
                />
                </div>
                </div>
                <button
                class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
                >
                <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button
                class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
                >
                <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
            </div>
<<<<<<< HEAD
            
=======
            <hr />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default pb-8">
>>>>>>> 5c8c02e (carousel plus proprement intégré à la page)
            <div className='text-primary-500 font-extrabold'>
                {loadingRandom ? < Loader /> :
                    <>
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Notre boutique
                            </h2>

                        </div>
                        <div className="w-full bg-custom-lightbrown">
                            <section className="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsRandom.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
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
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Nos promotions
                            </h2>
                        </div>
                        <div className="w-full bg-custom-orange">
                            <section className="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsPromotion.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
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
                        <div className="text-center pb-2">
                            <h2 className="font-bold text-3xl md:text-4xl lg:text-2xl font-heading text-black">
                                Les tops ventes
                            </h2>
                        </div>
                        <div className="w-full bg-custom-green">
                            <section className="max-w-4xl mx-auto px-4 sm:px-2 lg:px-2 py-12">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {(productsTopSale.map((product) =>
                                        <ProductHomePageCard
                                            key={product.id}
                                            product={product} />
                                    ))
                                    }

                                </div>
                            </section>
                        </div>
                    </>
                }
            </div>


            {/* hasRole(ROLE_ADMIN) && (
                <button className="btn btn-primary" onClick={() => history.push(URL_ADMIN_HOME)}>
                    Admin
                </button>
            )*/}
        </div>
    );

}

export default HomeView;
