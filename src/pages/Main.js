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
                <P>아는만큼</P>
                <P>깃허브 액션 자동화 테스트</P>
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
font-size : 18x;
font-weight : 700;
line-height:28px;
`
export default Main;