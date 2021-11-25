import React from 'react';
import styled from 'styled-components';
import MainCoupon from '../components/MainCoupon';
import { apis } from "../common/axios";

const Main = ()=>{
    const [rank,setRank] = React.useState([]);

    const getRank = async() => {
        try{
            const rank_result = await apis.getDcList();
            console.log(rank_result.data)
            setRank(rank_result.data.data);
        }catch(e){
            console.log('에러');
        }
    }

    React.useEffect(()=>{
        getRank();
    },[]);

    return(
        <React.Fragment>
            <RankListBox>
                <P>지금 가장</P>
                <P><Span>핫</Span> 한 할인은?</P>
                <Text>랭킹 Top10을 확인해 보세요</Text>
                {rank?.map((coupon)=>{
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