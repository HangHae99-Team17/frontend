import React from "react";
import styled from "styled-components";
import MainCoupon from "../components/MainCoupon";
import { apis } from "../common/axios";

const RankList = () => {
  const [rank, setRank] = React.useState([]);

  // 랭킹페이지 할인정보 가지고 오기
  React.useEffect(async () => {
    try {
      const rank_result = await apis.getDcList();
      setRank(rank_result.data.data); } 
    catch (e) {
      console.log("에러");
    }

  }, []);

  return (
    <React.Fragment>
      <MainBox>
      </MainBox>
      <RankListBox>
        <P>지금 <span style={{color : "#FFF"}}>핫</span> 한</P>
        <P>이런 할인 어때요 ?</P>
        <CardBox>
          {rank?.map((coupon) => {
            return <MainCoupon key={coupon.id} mode="rank" {...coupon} />;
          })}
        </CardBox>
      </RankListBox>
    </React.Fragment>
  );
};

const MainBox = styled.div`

`;

const RankListBox = styled.div`
  width: 375px;
  margin:0 auto;
  @media screen and (min-width: 1028px) {
    width: 1460px;
  }
`;

const P = styled.p`
  margin: 0 0 0 22px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const CardBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default RankList;
