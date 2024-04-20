import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setUserName, setUserAge} from "./../store/userSlice";
import {setCount, setStock} from "../store";
import {memo, useMemo, useState} from "react";

const test = () => {
    return 'aa';
}

//해당 컴포넌트 props가 변경시에만 재랜더링
const Child = memo( () => {
    console.log('rendering');

    return <div>자식임</div>
})

const Cart = () => {

    //처음 렌더링시에만 작동
    let result = useMemo(() => {
        return test();
    }, )

    let user = useSelector((state) => state.user);
    let cart = useSelector((state) => state.cart);
    let dispatch = useDispatch();

    let [count, setCount] = useState(0);

    return (
        <div>
            <Child count={count}/>
            <button onClick={() => {
                setCount(count+1)
            }}></button>

            {user.name}, {user.age}의 장바구니
            <button onClick={() => {
                dispatch(setUserAge(1))
            }}>버튼</button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    cart.map((content, i) =>
                        <tr key={i}>
                            <td>{cart[i].id}</td>
                            <td>{cart[i].name}</td>
                            <td>{cart[i].count}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(setCount(cart[i].id))
                                }}>+</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;