import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { actionCreators as saleActions } from "../redux/modules/sale";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import Button from "../elements/Button";

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
            <Title>쿠폰타이틀</Title>
            <p>{props.couponTitle}</p>
            <Button bg="#FF8F00" color="white" _onClick={editsale}>수정</Button>
            <Button bg="#FF8F00" margin="12px 0" color="white" _onClick={delsale}>삭제</Button>
        </React.Fragment>
    );
};

const Title = styled.div`
padding-top:25px;
font-weight:bold;
`


export default Coupon;