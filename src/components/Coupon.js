import React from 'react';
import {useDispatch} from 'react-redux';
import { actionCreators as saleActions } from "../redux/modules/sale";

const Coupon = (props) => {

    const dispatch= useDispatch();
    const delsale = () =>{
        dispatch(saleActions.delSaleFB(props.id))
    }

    return (
        <React.Fragment>
            <p>쿠폰타이틀</p>
            <p>{props.couponTitle}</p>
            <button onClick={delsale}>삭제</button>
        </React.Fragment>
    );
};

export default Coupon;