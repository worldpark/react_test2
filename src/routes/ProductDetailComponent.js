function ProductDetailComponent(props){

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={props.product.imgSrc} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.product.productName}</h4>
                    <p>{props.product.productDes}</p>
                    <p>{props.product.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )

}

export default ProductDetailComponent