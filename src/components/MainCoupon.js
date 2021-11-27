import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { colorBookmark, fullBookmark } from "../image";
import { useSelector } from "react-redux";
import { apis } from "../common/axios";

const MainCoupon = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const [zzim, setZzim] = useState(props.couponSelect === 1 ? true : false);

  const zzimz = async () => {
    if (is_login === false) {
      alert("로그인이 필요한 서비스 입니다!");
      history.push("/login");
    }

    if (zzim === false) {
      await apis.postCoupon(props.id);
      setZzim(true);
    } else if (zzim === true) {
      await apis.delFolders(props.id);
      setZzim(false);
    }
  };

  return (
    <Allbox>
      <Wrap>
        <Box
          onClick={() => {
            history.push(`/api/detail/${props.id}`);
          }}
        >
          <ImgBox2>
            <IMG2 src={props.couponImage} />
          </ImgBox2>
          <ImgBox>
            <IMG src={props.couponLogo} />
          </ImgBox>
          <div>
            <Title>{props.couponBrand}에서 </Title>
            <Dsec>
              <Strong>{props.couponSubTitle}</Strong> 할인 받기
            </Dsec>
          </div>
        </Box>
        <CouponButton>할인 받기</CouponButton>
        <Bookmarker onClick={zzimz}>
          {!is_login ? (
            <img
              src={colorBookmark}
              onClick={() => {
                alert("로그인이 필요한 서비스 입니다!");
                history.push("/login");
              }}
            />
          ) : (
            <img src={!zzim ? colorBookmark : fullBookmark} onClick={zzimz} />
          )}
        </Bookmarker>
      </Wrap>
    </Allbox>
  );
};

const Allbox = styled.div`
`;

const Wrap = styled.div`
  position: relative;
@media screen and (min-width:1028px){
height:325px;
width:360px;
border:1px solid #E0E0E0;
border-radius:15px;
margin-top:15px;
box-shadow: 2px 2px 6px #E0E0E0;
}
transform:scale(0.9);
`;
const Box = styled.div`
  
  width: 360px;
  height: 80px;
  display: flex;
  margin: 11px auto;
  position: relative;
  @media screen and (min-width:1028px){
  top:156px;
  }
`;
const ImgBox = styled.div`
  width: 60px;
  height: 50px;
  border-radius: 4px;
  margin: 16px 14px;
`;
const IMG = styled.img`
  width: 50px;
  position: absolute;
  top: 33%;
`;
const IMG2 = styled.img`
  width: 360px;
  position: relative;
  top: 33%;
`;
const ImgBox2 = styled.div`
  width: 360px;
  height: 240px;
  position: absolute;
  top: -245px;
  left: 0%;
  display: none;
  overflow: hidden;
  border-bottom:1px solid #E0E0E0;
  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #757575;
`;
const Dsec = styled.p`
margin-top:0;
  font-size: 16px;
  font-weight: 400;
`;

const CouponButton = styled.button`
display:none;
width:200px;
height:48px;
background-color:#F09643;
border:none;
border-radius:5px;
position:absolute;
top:253px;
left:85px;
color:white;
font-weight:bold;
font-size:16px;
@media screen and (min-width:1028px){
  display:block;
}
`;

const Bookmarker = styled.div`
  width: 35px;
  padding-left:10px;
  padding-top:10px;
  height: 35px;
  position: absolute;
  top: 13px;
  right: 2px;
  @media screen and (min-width:1028px){
    top:180px;
    right:10px;
    
  }
`;
const Strong = styled.span`
  color: #f09643;
`;

export default MainCoupon;
