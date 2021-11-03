import React from 'react';
import {useDispatch} from 'react-redux';
import { actionCreators as saleActions } from "../redux/modules/sale";
import { history } from "../redux/configureStore";

const Coupon = (props) => {

    const dispatch= useDispatch();
    const delsale = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(saleActions.delSaleFB(props.id))
    };
    
    const editsale = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        history.push(`/salewrite/${props.id}`);
    };

    return (
        <React.Fragment>
            <p>쿠폰타이틀</p>
            <p>{props.couponTitle}</p>
            <button onClick={editsale}>수정</button>
            <button onClick={delsale}>삭제</button>
        </React.Fragment>
    );
};

export default Coupon;