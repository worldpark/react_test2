import './App.css';
import {Button, Navbar, Container, Nav} from "react-bootstrap";
import bgImage from "./bg.png";
import {useState} from "react";
import product from "./data";
import {Routes, Route, useNavigate, Outlet} from "react-router-dom"
import ProductDetailComponent from "./routes/ProductDetailComponent";

function App() {
    let [productData, setProduct] = useState(
        product
    );

    let [selectProduct, setSelectProduct] = useState(
        0
    );

    let navigate = useNavigate();

    const clickProduct = (i) => {
        setSelectProduct(i);
        navigate('/detail');
    }

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
                        <div className="Container">
                            <div className="row" style={{display: 'flex'}}>
                                {
                                    productData.map((content, i) => {
                                        return(
                                            <>
                                                <div style={{width: '30%'}} onClick={() => clickProduct(i)}>
                                                    <ProductComponent
                                                        propducts={productData[i]}
                                                        onClick={() => clickProduct(i)}
                                                    />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                }/>
                <Route path="/detail" element={
                    <>
                        <ProductDetailComponent
                            product={productData[selectProduct]}/>
                    </>
                }/>
                <Route path="/about" element={ <About/> }>
                    <Route path="member" element={<div>멤버임</div>}/>
                    <Route path="location" element={<div>위치임</div>}/>
                </Route>

                <Route path="/event" element={ <Event/> }>
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

function ProductComponent(props) {

    return (
        <div className="col-md-4">
            <img src={props.propducts.imgSrc} width="80%"/>
            <h4>{props.propducts.productName}</h4>
            <p>{props.propducts.productDes}</p>
            <p>{props.propducts.price}$</p>
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
