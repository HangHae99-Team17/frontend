import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";
import { actionCreators as foldersCreators } from '../redux/modules/salebox';
import {history} from '../redux/configureStore'
import {bookmark} from '../image';

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
            <Image><Image2 src={detail_list?.couponImage}></Image2></Image>
            <Info>
            <div>
            <Title>
            {detail_list?.couponTitle}
            <br/>{detail_list?.couponSubTitle} 할인 받기
            </Title>
            <Span>{detail_list?.couponCreate}~{detail_list?.couponDespire}</Span>
            <Div>{detail_list?.couponType} 카테고리예요</Div>
            </div>
            </Info>
            <LikeWrap>
            <TakeCoupon>
            <A href = {detail_list?.couponUrl}> 할인 사용처 바로가기 </A>
            </TakeCoupon>
            <PickCoupon onClick={PostCoupon}> 
            <Bookmarker src={bookmark}/> 
            <Like>{detail_list?.couponLike}</Like>
            </PickCoupon>
            </LikeWrap>
            <P>상세설명</P>
            <Div>{detail_list?.couponDesc}</Div>
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
const LikeWrap = styled.div`
display : flex;
width :  355px;
height : 50px;
margin : 160px 0 0 16px;
`
const TakeCoupon = styled.div`
width : 264px;
height : 48px;
line-height : 48px;
border : 1px solid #F09643;
background-color : #F09643;
display : flex;
border-radius : 4px;
`
const A = styled.a`
text-decoration : none;
font-size : 16px;
font-weight : 500;
color : #000;
margin-left : 70px;
`
const PickCoupon = styled.div`
width : 48px;
height : 48px;
border : 1px solid #d6d6d7;
border-radius : 4px;
background-color : #fff;
margin-left : 20px;
`
const P =styled.p`
margin : 30px 16px;
font-size :  18px;
font-weight :  600;
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
margin : 16px;
`
const Div = styled.div`
margin: 0 0 0 16px;
font-size : 14px;
`
const Span = styled.div`
margin: 20px 16px;
font-size : 17px;
font-weight : 400;
color : #FF8F00;
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
export default Detail;