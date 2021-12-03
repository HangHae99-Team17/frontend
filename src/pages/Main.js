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
const MainImg = styled.img`
  width: 100%;
  top: -35px;
  position: relative;
  display: none;
  @media screen and (min-width: 1028px) {
    display: block;
  }
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

export default Main;
