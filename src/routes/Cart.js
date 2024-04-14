import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setUserName, setUserAge} from "./../store/userSlice";
import {setCount, setStock} from "../store";

const Cart = () => {

    let user = useSelector((state) => state.user);
    let cart = useSelector((state) => state.cart);
    let dispatch = useDispatch();

    return (
        <div>
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