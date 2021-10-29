const ProductDetails = ({label, price, description}) => {
    return(
        <>
            <span className="font-bold">{label}</span>
            <br/>
            <span>{price} €</span>
            <br/>
            <span>{description}</span>
        </>
    );
};

export default ProductDetails;