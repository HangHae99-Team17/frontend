import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import { history } from "../redux/configureStore";
import { listCreators } from '../redux/modules/main';
import MainCoupon from '../components/MainCoupon';
import Main from './Main';



const LoginMain = () => {
  const dispatch = useDispatch();
  // 유저 관심사, 카드사, 통신사 뽑아 오기
    const userMenu = useSelector((state)=>state.user.user)
    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]

  // 디스패치 시에 type과 무한스크롤 적용에 필요한 데잍터를 보내줘야 정보를 가지고 올 수 있다.
    React.useEffect(()=>{
        if(MenuArr.length > 0){
      const type = [MenuArr[0],MenuArr[1],MenuArr[2],MenuArr[3],MenuArr[4]]
       dispatch(listCreators.getListMW(MenuArr[0],1,3,"couponLike",false));
       dispatch(listCreators.getListMW(MenuArr[1],1,3,"couponLike",false));
       dispatch(listCreators.getListMW(MenuArr[2],1,3,"couponLike",false));
       dispatch(listCreators.getListMW(MenuArr[3],1,3,"couponLike",false));
       dispatch(listCreators.getListMW(MenuArr[4],1,3,"couponLike",false));
    
  // 언마운트시 데이터 비우기
    return()=>{
      dispatch(listCreators.clearList())
        }
      }
      }
    ,[userMenu])
    // 리덕스에서 할인정보 리스트 가지고 오기
    const dc_list = useSelector(( state )=> state.main.pagingList);
    // 카테고리 별로 나눠주기위해 같은 카테고리의 쿠폰끼리 그룹화 해주기
    const type1 = [dc_list?.[0],dc_list?.[1],dc_list?.[2]]
    const type2 = [dc_list?.[3],dc_list?.[4],dc_list?.[5]]
    const type3 = [dc_list?.[6],dc_list?.[7],dc_list?.[8]]
    const telecom = [dc_list?.[9],dc_list?.[10],dc_list?.[11]]
    const cards = [dc_list?.[12],dc_list?.[13],dc_list?.[14]]



     
    return(
    <AllBox>
      {/* 유저 관심사 타입1 */}
        <InfoWrap>
          <Title>
          <Br>당신을 위한</Br>
          <Span>{dc_list?.[0]?.couponType}</Span> 추천
          </Title>
          <CardBox>
        {
        type1?.map((item) => {
          return (
            <MainCoupon {...item} key={item?.id} mode="rank"/>
            );
          })
        }
        </CardBox>
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[0]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>

      {/* 유저 관심사 타입2 */}
        <InfoWrap>
        <Title>
        <Br>당신을 위한</Br>
        <Span>{dc_list?.[3]?.couponType}</Span> 추천
        </Title>
        <CardBox>
        {
        type2?.map((item) => {
          return (
              <MainCoupon  {...item} key={item?.id} mode="rank"/>
            );
         })
        }
        </CardBox>
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[3]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>

       {/* 유저 관심사 타입3 */}
        <InfoWrap>
        <Title>
        <Br>당신을 위한</Br>
          <Span>{dc_list?.[6]?.couponType}</Span> 추천
        </Title>
        <CardBox>
        {
        type3?.map((item) => {
          return (
              <MainCoupon {...item} key={item?.id} mode="rank"/>
            );
          })
        }
        </CardBox>
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[6]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>

      {/* 유저 통신사 */}
      <InfoWrap>
        <Title>
        <Br>당신을 위한</Br>
          <Span>{dc_list?.[9]?.couponType}</Span> 추천
        </Title>
        <CardBox>
        {
        telecom?.map((item) => {
          return (
              <MainCoupon {...item} key={item?.id} mode="rank"/>
            );
          })
        }
        </CardBox>
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[9]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>

      {/* 유저 카드사 */}
      <InfoWrap>
        <Title>
        <Br>당신을 위한</Br>
          <Span>{dc_list?.[12]?.couponType}</Span> 추천
        </Title>
        <CardBox>
        {
        cards?.map((item) => {
          return (
              <MainCoupon {...item} key={item?.id} mode="rank"/>
            );
          })
        }
        </CardBox>
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[12]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>
        <Main/>
  </AllBox>
    )    
}

const AllBox = styled.div`
width : 375px;
display : block;
margin: 0 auto;
@media screen and (min-width:1028px){
width:100%;

}
`
const InfoWrap = styled.ul`
width : 375px;
padding : 0;
display:flex;
flex-flow: column nowrap;
@media screen and (min-width:1028px){
  width:100%;
}
`;

const Button = styled.button`
width : 335px;
height : 43px;
font-size : 16px;
font-weight : 800;
margin:0 auto;
color : white;
border : none;
border-radius : 8px;
background-color : #F09643;
cursor:pointer;
@media screen and (min-width:1028px){
  width : 325px;
}
`
const BtWrap = styled.div`
width : 335px;
height : 48px;
margin : 10px auto 20px auto;
@media screen and (min-width:1028px){
  margin-bottom:40px;
}
`
const Title = styled.div`
width :200px;
height : auto;
margin : 0 0 0 20px;
font-size : 20px;
font-weight : 600;
line-height:33px;
@media screen and (min-width:1028px){
  margin-left:25%;
  width:1070px;
  margin:0 auto;
}
`
const CardBox = styled.div`
diplay:none;
@media screen and (min-width:1028px){
width:1100px;
margin:0 auto;
display:flex;
}
`


const Br = styled.div`
margin-top : 8px;
font-size : 20px;
font-weight : 600;

`
const Span = styled.span`
color : #F09643
`
export default LoginMain;