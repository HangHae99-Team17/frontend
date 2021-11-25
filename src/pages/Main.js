import React from "react";
import styled from "styled-components";
import MainCoupon from "../components/MainCoupon";
import { apis } from "../common/axios";
import { MainBackground } from "../image";
import { history } from "../redux/configureStore";

const Main = () => {
  const [rank, setRank] = React.useState([]);

  const getRank = async () => {
    try {
      const rank_result = await apis.getDcList();
      console.log(rank_result.data);
      setRank(rank_result.data.data);
    } catch (e) {
      console.log("에러");
    }
  };

  React.useEffect(() => {
    getRank();
  }, []);

  return (
    <React.Fragment>
      <MainBox>
        <MainImg src={MainBackground} />
      </MainBox>
      <RankListBox>
        <P>지금 가장</P>
        <P>
          <Span>핫</Span> 한 할인은?
        </P>
        <Text>랭킹 Top10을 확인해 보세요</Text>
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
const MainImg = styled.img`
  width: 100%;
  top: -110px;
  position: relative;
  display: none;
  @media screen and (min-width: 1028px) {
    display: block;
  }
`;

const RankListBox = styled.div`
  width: 360px;
  margin: auto;
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

const Span = styled.span`
  color: #f09643;
`;
const Text = styled.p`
  margin-left: 20px;
  font-size: 14px;
  font-weight: 700;
`;
const CardBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default Main;
