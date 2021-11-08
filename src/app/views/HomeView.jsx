import React, { useEffect, useState } from 'react';
import { productDetail } from "../api/backend/product";
import ProductDetails from '../components/product/ProductDetails';
import ProductHomePageCard from '../components/product/ProductHomePageCard';
import { hasRole } from './../shared/services/accountServices';
import { ROLE_ADMIN } from './../shared/constants/rolesConstant';
import { URL_ADMIN_HOME } from './../shared/constants/urls/urlConstants';

/**
 * The view file for the home page of the website
 * 
 * @param {*} param0 
 * @returns the view of the home page
 * 
 * @author Cecile
 */
const HomeView = ({ history }) => {

    const [product, setProduct] = useState([])

    useEffect(() => {

        (async function getProduct() {

            await productDetail().then(response => {
                setProduct(response.data);
            });
        })();
    }, []);


    return (
        <div>
            <p className='text-primary-500 font-extrabold'>
                HOME<br />
                WTF<br />
                sqdqsdqs<br />
                dqsdsq<br />

                {/*<ProductHomePageCard product={product} />*/}
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
