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
if(props.mode === "rank" && props.mini === "mini"){  
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
        <Bookmarker>
          {!is_login ? (
            <div>
            <img
              src={colorBookmark}
              onClick={() => {
                alert("로그인이 필요한 서비스 입니다!");
                history.push("/login");
              }}
            />
            <CouponLike>{props.couponLike}</CouponLike>
            </div>
          ) : (
            <div>
            <img src={!zzim ? colorBookmark : fullBookmark} onClick={zzimz} />
            <CouponLike>{props.couponLike}</CouponLike>
            </div>
          )}
        </Bookmarker>
      </Wrap>
    </Allbox>
  );

  
          }else if(props.mode === "rank"){
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
                      <Title><Strong>{props.couponBrand}</Strong> 에서 </Title>
                      <Dsec>
                        <Strong>{props.couponSubTitle}</Strong> 할인 받기
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
  
  width: 360px;
  height: 80px;
  display: flex;
  margin: 11px auto;
  position: relative;
  @media screen and (min-width:1028px){
  top:155px;
  }
`;
const ImgBox = styled.div`
  width: 60px;
  height: 50px;
  border-radius: 4px;
  margin: 16px 10px;
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
  top: 13px;
  right: 2px;
`;
export default MainCoupon;
