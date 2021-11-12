import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";
import { foldersCreators } from '../redux/modules/folders';
import {history} from '../redux/configureStore'
import { addImg,bookmarker,companyLogo } from '../image';

const Detail = (props) => {
    const Id = props.match.params.id

    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(detailCreators.getDetailMW(Id))
    },[]);

    const detail_list = useSelector((state) => state.detail.info.data );
    const is_login = useSelector((state) => state.user.is_login)

    function PostCoupon(){
        if(is_login){
        const couponId = {
            couponId : Id,
        };
        dispatch(foldersCreators.addPostMW(couponId));
         }
         else{alert("로그인이 필요한 서비스 입니다!")}
}


    return(
        <Wrap>
            <Image><Image2 src={detail_list?.couponLogo}></Image2></Image>
            <Info>
            <div>
            <Title>{detail_list?.couponTitle}</Title>
            <Div>{detail_list?.couponType}</Div>
            </div>
            <BrandLogo src={detail_list?.couponLogo}/>
            </Info>
            <P>{detail_list?.couponDespire}</P>
            <TakeCoupon>
            <A href = {detail_list?.couponUrl}> 할인 사용처 바로가기 </A>
            <PickCoupon onClick={PostCoupon}> 
            <Bookmarker src={bookmarker}/> 
            <Like>{detail_list?.couponLike}</Like>
            </PickCoupon>
            </TakeCoupon>
            <Line/>
            <Div>{detail_list?.couponDesc}</Div>
            <Line/>
            <ConditionBox>
            <Condition>할인 적용 조건</Condition>
            </ConditionBox>
        </Wrap>
    )
}

const Wrap = styled.div`
width : 100vw;
height : 100vh;
`
const Image2 = styled.img`
width : 375px;
height : 200px;
`
const TakeCoupon = styled.div`
width : 328px;
height : 50px;
line-height : 50px;
border : 2px solid #F09643;
display : flex;
margin : 45px auto 30px auto;
position :relative;
border-radius : 4px;
`
const A = styled.a`
text-decoration : none;
font-size : 16px;
font-weight : 700;
color : #F09643;
margin-left : 70px;
`
const PickCoupon = styled.div`
width : 60px;
height : 50px;
background-color : #F09643;
position : absolute;
right :0;
`
const BrandLogo = styled. img`
width : 50px;
height : 50px;
position : absolute;
right : 16px;
bottom : 0px;
border : 1px solid #D4D4D4;
border-radius : 4px;
`
const P =styled.p`
margin-top : 10px;
position : absolute;
right : 16px;
`
const Like = styled.div`
display :inline-block;
height : 10px;
position : absolute;
top : 13px;
right : 25px;
color : #fff;
font-weight : 600;
`
const Bookmarker = styled.img`
margin : 0 18px;
`
const Line = styled.hr`
width : 100%
`
const Div = styled.div`
margin-left: 16px;
font-size : 14px;
`
const Image = styled.div`
width : 100%;
height : 200px;
text-align: center;
margin : 20px auto;
`
const Title = styled.div`
font-size : 23px;
font-weight : bold;
margin-left : 16px;
`
const Info = styled.div`
display : flex;
width : 375px;
height : 50px;
position : relative;
`
const Condition= styled.p`
font-size : 17px;
font-weight : 600;
`
const ConditionBox = styled.div`
margin : 16px;
`
export default Detail;