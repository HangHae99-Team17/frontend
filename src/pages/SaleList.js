import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as saleActions } from "../redux/modules/sale";
import Coupon from '../components/Coupon';
import styled from 'styled-components';

const SaleList = (props) => {

    const dispatch = useDispatch();
    const sale_list = useSelector((state) => state.sale.list);

    useEffect(()=>{
        dispatch(saleActions.setSaleFB());
    },[])

    

    return (
        <React.Fragment>
            <AllBox>
                <BoxIn>
            <Notice>쿠폰목록 총 {sale_list.length}개 등록 중</Notice>
            {sale_list.map((sale) => {
                return(
                    <Coupon key={sale.id} {...sale}/>
                )
            })}
            </BoxIn>
            </AllBox>
        </React.Fragment>
    );
};

const AllBox = styled.div`
width:100%;
`

const BoxIn = styled.div`
width:290px;
margin:0 auto;
`
const Notice = styled.div`
font-weight:bold;
font-size:20px;
`

export default SaleList;