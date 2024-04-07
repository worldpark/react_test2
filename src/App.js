import './App.css';
import {Button, Navbar, Container, Nav} from "react-bootstrap";
import bgImage from "./bg.png";
import {useState} from "react";

function App() {
    let [productData, setProduct] = useState(
        [{ 'imgSrc': 'https://codingapple1.github.io/shop/shoes1.jpg'
            , 'productName': '상품명1', 'productDes': '설명1'}
        , { 'imgSrc': 'https://codingapple1.github.io/shop/shoes2.jpg'
            , 'productName': '상품명2', 'productDes': '설명2'}
        , { 'imgSrc': 'https://codingapple1.github.io/shop/shoes3.jpg'
            , 'productName': '상품명3', 'productDes': '설명3'}]
    );

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">리액트 공부중</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="main-bg" style={{backgroundImage: 'url(' + bgImage + ')'}}>
            </div>

            <div className="Container">
                <div className="row">
                    {
                        productData.map((content, i) => {
                            return(
                                <div className="col-md-4">
                                    <img src={productData[i].imgSrc} width="80%"/>
                                    <h4>{productData[i].productName}</h4>
                                    <p>{productData[i].productDes}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
