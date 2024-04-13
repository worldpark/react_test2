import {useParams} from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button`
    background: ${props => props.bg};
    color:  ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px;
`

function ProductDetailComponent(props) {

    let {id} = useParams();

    const findProduct = (element) => {
        if (element.id == id) {
            return true;
        }
    }

    const selectProduct = props.product.find(findProduct);

    return (
        <div className="container">
            <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="orange">버튼</YellowBtn>
            {
                selectProduct === undefined ?
                    <div>해당 상품은 없습니다.</div> :
                    <div className="row">
                        <div className="col-md-6">
                            <img src={selectProduct.imgSrc} width="100%"/>
                        </div>
                        <div className="col-md-6">
                            <h4 className="pt-5">{selectProduct.productName}</h4>
                            <p>{selectProduct.productDes}</p>
                            <p>{selectProduct.price}</p>
                            <button className="btn btn-danger">주문하기</button>
                        </div>
                    </div>
            }
        </div>
    )

}

export default ProductDetailComponent