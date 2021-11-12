import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components';
import MainCoupon from '../components/MainCoupon';


const Main = ()=>{
    const dispatch = useDispatch();
    const coupons = useSelector((state)=>state.main.rank.data);

    React.useEffect(()=>{
        dispatch(listCreators.getDcListMW())
    },[]);

    console.log(coupons)
    return(
        <div>
            <P>아는만큼</P>
            <P>아낄 수 있게</P>
            {coupons?.map((coupon)=>{
                return(
                    <MainCoupon key={coupon.id} {...coupon}/>
            );
            })}
        </div>
    )
}

const P = styled.p`
margin : 10px 0 0 16px;
font-size : 20px;
font-weight : 700;
`

export default Main;