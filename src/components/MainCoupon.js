import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { colorBookmark, fullBookmark } from "../image";
import { useSelector } from "react-redux";
import { apis } from "../common/axios";
import ReactGA from 'react-ga';


const MainCoupon = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const [zzim, setZzim] = useState(props.couponSelect === 1 ? true : false);

  const zzimz = async () => {
    if (zzim === false) {
      await apis.postCoupon(props.id);
      setZzim(true);
    } else if (zzim === true) {
      await apis.delFolders(props.id);
      setZzim(false);
      ReactGA.event({
        category: "Button",
        action: "zzim coupon",
        label: "bookmark",
      });
    }
  };
if(props.mode === "rank" && props.mini === "mini"){  
  return (
  <Allbox2>
    <Wrap2>
      <Box2
        onClick={() => {
          history.push(`/api/detail/${props.id}`);
        }}
      >
        <ImgBox3>
          <IMG2 src={props.couponImage} />
        </ImgBox3>
        <ImgBox>
          <IMG src={props.couponLogo} />
        </ImgBox>
        <div>
          <Title>{props.couponBrand}에서 </Title>
          <Dsec>
            <Strong>{props.couponSubTitle} 할인 받기</Strong>
          </Dsec>
        </div>
      </Box2>
      <CouponButton2>할인 받기</CouponButton2>
      <Bookmarker2>
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
      </Bookmarker2>
    </Wrap2>
  </Allbox2>
);
          }else{
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
                        <Strong>{props.couponSubTitle} 할인 받기</Strong>
                      </Dsec>
                    </div>
                  </Box>
                  <CouponButton>할인 받기</CouponButton>
                  <Bookmarker>
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



          
          }


};

const Allbox = styled.div`
`;


const Wrap = styled.div`
  position: relative;
  cursor: pointer;
@media screen and (min-width:1028px){
height:335px;
width:360px;
border:1px solid #E0E0E0;
border-radius:15px;
margin-top:15px;
overflow:hidden;
box-shadow: 2px 2px 6px #E0E0E0;
}
transform:scale(0.9);
`;
const Box = styled.div`
  
  width: 380px;
  height: 80px;
  display: flex;
  margin: 11px auto;
  position: relative;
  @media screen and (min-width:1028px){
  top:155px;
  }
`;
const ImgBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  margin: 21px 24px 0 0;
  border:1px solid #E0E0E0; 
  @media screen and (min-width:1028px){
    margin-left:17px;
    }
`;
const IMG = styled.img`
width:50px;
display : block ;
margin: auto;
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
  font-size: 17px;
  font-weight: 400;
  color: #757575;
`;
const Dsec = styled.p`
margin-top:-8px;
  font-size: 17px;
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
top:263px;
left:85px;
color:white;
font-weight:bold;
font-size:16px;
@media screen and (min-width:1028px){
  display:block;
  cursor:pointer;
}
`;

const Bookmarker = styled.div`
  width: 35px;
  padding-left:10px;
  padding-top:10px;
  height: 35px;
  position: absolute;
  top: 15px;
  right: -11px;
  @media screen and (min-width:1028px){
    top:183px;
    right:10px;
    cursor:pointer;
    
  }
`;

const CouponLike = styled.div`
margin-left : 8px;
font-weight : 800;
color : #f09643;
`
const Strong = styled.span`
  color: #f09643;
`;

const Allbox2 = styled.div`
  .wrap2{
    position: relative;
    cursor: pointer;
  }
`;

const Wrap2 = styled.div`
  position: relative;
  cursor: pointer;
  `
  const Box2 = styled.div`
  
  width: 360px;
  height: 80px;
  display: flex;
  margin: 11px auto;
  position: relative;
  `
  const ImgBox3 = styled.div`
  width: 360px;
  height: 240px;
  position: absolute;
  top: -245px;
  left: 0%;
  display: none;
  overflow: hidden;
  border-bottom:1px solid #E0E0E0;
`;
const CouponButton2 = styled.button`
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
`;

const Bookmarker2 = styled.div`
  width: 35px;
  padding-left:10px;
  padding-top:10px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 4px;
`;
export default MainCoupon;
