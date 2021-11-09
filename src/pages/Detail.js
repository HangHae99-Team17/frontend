import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";
import { foldersCreators } from '../redux/modules/folders';
import {history} from '../redux/configureStore'
import { addImg,bookmarker,companyLogo } from '../image';

const Detail = (props) => {
    // 해당 할인 정보 id값만 추출하기
    const Id = props.match.params.id

    const dispatch = useDispatch();
    // 리덕스에서 info를 불러올때 해당 Id값의 info만 불러올 수 있도록 디스패치 해준다.
    // 액션이 먼저 발생하고 리덕스의 값을 데리고 와야 하기 때문에 디스패치 먼저 해준다.
    React.useEffect(()=>{
        dispatch(detailCreators.getDetailMW(Id))
    },[])

    // 리덕스에서 데이터 가지고 오기
    const detail_list = useSelector((store) => store.detail.info.data );

    // 찜한 쿠폰 백에 보내주기post
    // api에서 적은 couponId 가 아래 couponId이다. jason 형태로 보내져야 하는 것.
    function PostCoupon(){
        const couponId = {
            couponId : Id,

        };
        // 디스패치 할 때 couponId를 넘겨준다.
        dispatch(foldersCreators.addPostMW(couponId));
    } 


    return(
        <Wrap>
            <Image><img src={addImg}></img></Image>
            <Info>
            <div>
            <Title>{detail_list?.couponTitle}</Title>
            <Div>{detail_list?.couponType}</Div>
            </div>
            <div><BrandLogo src={companyLogo}/></div>
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
`
const P =styled.p`
margin-top : 15px;
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
`
const Condition= styled.p`
font-size : 17px;
font-weight : 600;
`
const ConditionBox = styled.div`
margin : 16px;
`
export default Detail;