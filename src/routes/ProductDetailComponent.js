import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import './../App.css';
import {Context1} from './../App';

let YellowBtn = styled.button`
    background: ${props => props.bg};
    color:  ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px;
`

function ProductDetailComponent(props) {

    let {stock} = useContext(Context1);

    let [divVisible, setDivVisible] = useState(true);
    let [count, setCount] = useState(0);

    let [tab, setTab] = useState(0);

    //mounted, updated // deps 넣을시 mounted, watch?
    useEffect(() => {
        let timer = setTimeout(() =>{
            setDivVisible(false);
        }, 2000);

        //unmounted, created? mounted 이전
        return () => {
            clearTimeout(timer);
        }
    }, [])

    let [quantity, setQuantity] = useState('');
    const inputQuantity = (event) => {
        setQuantity(event.target.value);
    }

    let [quantityError, setQuantityError] = useState(false);
    useEffect(() => {
        if(isNaN(quantity)){
            setQuantityError(true);
        }else{
            setQuantityError(false);
        }
    }, [quantity])

    let {id} = useParams();

    const findProduct = (element) => {

        return element.id == id;
    }

    const selectProduct = props.product.find(findProduct);

    const [fade, setFade] = useState('');

    useEffect(() => {

        let cssTimer = setTimeout(() => {
            setFade('end');
        }, 100);

        return(() => {
            clearTimeout(cssTimer);
            setFade('');
        })

    }, [id]);

    return (
        <div className={'start ' + fade}>
            <div className={'container'}>
                {
                    divVisible ?
                        <div className="alert alert-warning">
                            2초이내 구매시 할인
                        </div> : null
                }
                {count}
                <YellowBtn onClick={() => setCount(count+1)} bg="blue">버튼</YellowBtn>
                <YellowBtn bg="orange">버튼</YellowBtn>
                {
                    selectProduct === undefined ?
                        <div>해당 상품은 없습니다.</div> :
                        <div className="row">
                            <div className="col-md-6">
                                <img src={selectProduct.imgSrc} width="100%"/>
                            </div>
                            <div className="col-md-6">
                                {
                                    quantityError ? <div style={{background: 'red', color: 'white'}}>경고 : 숫자만 입력하세요</div>: null
                                }
                                <input type="text" value={quantity} onChange={inputQuantity}/>
                                <h4 className="pt-5">{selectProduct.productName}</h4>
                                <p>{selectProduct.productDes}</p>
                                <p>{selectProduct.price}</p>
                                <button className="btn btn-danger">주문하기</button>
                            </div>
                        </div>
                }
                <Nav defaultActiveKey="link0" variant="tabs">
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setTab(0);
                        }} eventKey="link0">버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setTab(1);
                        }} eventKey="link1">버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setTab(2);
                        }} eventKey="link2">버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent tab={tab}/>
            </div>
        </div>
    )

}

const TabContent = ({tab}) => {

    let [fade, setFade] = useState('');
    let {stock} = useContext(Context1);

    useEffect(() => {
        let timer = setTimeout(() => {
            setFade('end');
        }, 100)

        return() => {
            setFade('');
            clearTimeout(timer);
        }
    }, [tab]);

    return (
        <div className={'start ' + fade}>
            {
                [<div>내용0{stock[0]}</div>, <div>내용1</div>, <div>내용2</div>][tab]
            }
        </div>
    )
}

export default ProductDetailComponent