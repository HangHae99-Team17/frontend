import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components';
import MainCoupon from '../components/MainCoupon';


const Main = ()=>{
    const dispatch = useDispatch();
    const coupons = useSelector((state)=>state.main.rank.data);

    React.useEffect(()=>{
        dispatch(listCreators.getDcListMW());
    },[]);

    return(
        <div>
            <P>아는만큼</P>
            <P>아낄 수 있게깃허브 액션 테스트</P>
            {coupons?.map((coupon)=>{
                return(
                    <MainCoupon key={coupon.id} {...coupon} />
            );
            })}
        </div>
    )
}

const P = styled.p`
margin : 0 0 0 22px;
font-size : 18x;
font-weight : 700;
line-height:28px;
`
export default Main;