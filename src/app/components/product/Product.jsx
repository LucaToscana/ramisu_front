import React from 'react'

export const Product = ({label, price, description}) => {
    return (
        <div>
            <span>{label}</span>
            <span>{price}€</span>
            <span>{description}</span>
        </div>
    )
}