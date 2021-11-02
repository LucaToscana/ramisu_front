import React from "react";

/**
 * Component product to show details
 * @param label
 * @param price
 * @param description
 * @returns show details product

 */
const ProductDetails = ({label, price, description}) => {
    return(
        <>
            <div className="flex flex-col flex items-center bg-gray-200 mb-2">
                <div className="font-bold">{label}</div>
                <div className="pr-2"><span>Prix: </span>{price}€ </div>
            </div>
            <div className="rounded-2xl bg-yellow-400 mr-2 ml-2 pl-1 border-double border-2">{description}</div>

        </>
    );
};

export default ProductDetails;