import React from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import MainCoupon from '../components/MainCoupon';


const Main = ()=>{
    const dispatch = useDispatch();
    const coupons = useSelector((state)=>state.main.rank);

    React.useEffect(()=>{
        dispatch(listCreators.getDcListMW());
    },[]);

    return(
        <React.Fragment>
            <RankListBox>
                <P>지금 가장</P>
                <P><Span>핫</Span> 한 할인은?</P>
                <Text>랭킹 Top10을 확인해 보세요</Text>
                {coupons?.map((coupon)=>{
                    return(
                        <MainCoupon key={coupon.id} mode="rank" {...coupon} />
                );
                })}
            </RankListBox>
        </React.Fragment>
    )
}

const RankListBox = styled.div`
    width: 372px;
    margin: auto;
`;


const P = styled.p`
margin : 0 0 0 22px;
font-size : 20px;
font-weight : 700;
line-height:28px;
`

const Span = styled.span`
color : #F09643;
`
const Text = styled.p`
margin-left : 20px;
font-size : 14px;
font-weight: 700
`
export default Main;