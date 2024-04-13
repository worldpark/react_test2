import './App.css';
import {Button, Navbar, Container, Nav} from "react-bootstrap";
import bgImage from "./bg.png";
import {createContext, useState} from "react";
import product from "./data";
import {Routes, Route, useNavigate, Outlet} from "react-router-dom"
import ProductDetailComponent from "./routes/ProductDetailComponent";
import axios from "axios";

export let Context1 = createContext();

function App() {
    let [productData, setProduct] = useState(
        product
    );

    let [stock, setStock] = useState([10, 11, 12]);

    let navigate = useNavigate();

    const sortBtn = () => {
        let copy = [...productData];
        copy = copy.sort((a, b) => {
            let firstData = a.productName.toLowerCase();
            let secondData = b.productName.toLowerCase();

            return firstData < secondData ? -1 : firstData > secondData ? 1 : 0;

        });

        setProduct(copy);

    }

    let [buttonClickCount, setButtonClickCount] = useState(0);
    let [buttonVisible, setButtonVisible] = useState(true);
    let [loadingVisible, setLoadingVisible] = useState(false);

    return (
        <div className="App">

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">리액트 공부중</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/detail">Detail</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/event">Event</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <>
                        <div className="main-bg" style={{backgroundImage: 'url(' + bgImage + ')'}}>
                        </div>
                        <button onClick={() => sortBtn()}>sort</button>
                        <div className="Container">
                            <div className="row">
                                {
                                    productData.map((content, i) => {
                                        return (
                                            <div className="col-md-4" key={i}
                                                 onClick={() => navigate('/detail/' + productData[i].id)}>
                                                <HomeComponent
                                                    products={productData[i]}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            buttonVisible ?
                                loadingVisible ?
                                    <div>
                                        로딩중...
                                    </div> :
                                    <button onClick={() => {
                                        setLoadingVisible(true);

                                        if (buttonClickCount == 0) {
                                            axios.get('https://codingapple1.github.io/shop/data2.json')
                                                .then((response) => {

                                                    let resData = response.data;
                                                    for (let i = 0; i < resData.length; i++) {
                                                        resData[i].imgSrc = 'https://codingapple1.github.io/shop/shoes1.jpg';
                                                        resData[i].productName = resData[i].title;
                                                        resData[i].productDes = resData[i].content;
                                                    }

                                                    let copy = [
                                                        ...productData,
                                                        ...resData];

                                                    setProduct(copy);
                                                    setLoadingVisible(false);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    setLoadingVisible(false);
                                                })
                                        } else if (buttonClickCount == 1) {
                                            axios.get('https://codingapple1.github.io/shop/data3.json')
                                                .then((response) => {

                                                    let resData = response.data;
                                                    for (let i = 0; i < resData.length; i++) {
                                                        resData[i].imgSrc = 'https://codingapple1.github.io/shop/shoes1.jpg';
                                                        resData[i].productName = resData[i].title;
                                                        resData[i].productDes = resData[i].content;
                                                    }

                                                    let copy = [
                                                        ...productData,
                                                        ...resData];

                                                    setProduct(copy);
                                                    setLoadingVisible(false);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                    setLoadingVisible(false);
                                                })
                                            setButtonVisible(false);
                                        }

                                        setButtonClickCount(buttonClickCount + 1);
                                    }}>
                                        더보기
                                    </button> : null
                        }

                    </>
                }/>
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{stock}}>
                        <ProductDetailComponent product={productData}/>
                    </Context1.Provider>
                }/>
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div>위치임</div>}/>
                </Route>

                <Route path="/event" element={<Event/>}>
                    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
                    <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
                </Route>

                <Route path="*" element={
                    <>
                        <div>404 page</div>
                    </>
                }/>
            </Routes>
        </div>
    );
}

function HomeComponent(props) {

    return (
        <div>
            <img src={props.products.imgSrc} width="80%"/>
            <h4>{props.products.productName}</h4>
            <p>{props.products.productDes}</p>
            <p>{props.products.price}$</p>
        </div>
    )

}

const About = () => {
    return (
        <div>
            <h4>info</h4>
            <Outlet></Outlet>
        </div>
    )
}

const Event = () => {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet/>
        </div>
    )
}

export default App;
