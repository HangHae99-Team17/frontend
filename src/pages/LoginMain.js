import React, { useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import { history } from "../redux/configureStore";
import { listCreators } from '../redux/modules/main';
import MainCoupon from '../components/MainCoupon';



const LoginMain = () => {
  const dispatch = useDispatch();
  // 유저 관심사, 카드사, 통신사 뽑아 오기
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu,"안녕")
    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]
    console.log(MenuArr)
  // 로그인 여부를 확인하기 위함
    const is_login = useSelector((state) => state.user.is_login);

  // 디스패치 시에 type을 보내줘야 정보를 가지고 올 수 있다.
    React.useEffect(()=>{
      console.log(MenuArr)
        // 확인을 위해 삼항 조건연산자 사용
        if(MenuArr.length > 0){
      const type = [MenuArr[0],MenuArr[1],MenuArr[2],MenuArr[3],MenuArr[4]]
      console.log("안녕",type)
       dispatch(listCreators.getListMW(MenuArr[0],1,3,"couponCreate",true));
       dispatch(listCreators.getListMW(MenuArr[1],1,3,"couponCreate",true));
       dispatch(listCreators.getListMW(MenuArr[2],1,3,"couponCreate",true));
      //  제대로 된 데이터 들어오면 주석처리 해제
      //  dispatch(listCreators.getListMW(MenuArr[4],1,3,"couponCreate",true));
      //  dispatch(listCreators.getListMW(MenuArr[5],1,3,"couponCreate",true));
        }
    }
    ,[userMenu])
    // 리덕스에서 할인정보 리스트 가지고 오기
    const dc_list = useSelector(( state )=> state.main.pagingList);
    console.log(dc_list)
    const type1 = [dc_list?.[0],dc_list?.[1],dc_list?.[2]]
    const type2 = [dc_list?.[3],dc_list?.[4],dc_list?.[5]]
    const type3 = [dc_list?.[6],dc_list?.[7],dc_list?.[8]]
    // const telecom = [dc_list?.[12],dc_list?.[13],dc_list?.[14],dc_list?.[15]]
    // const cards = [dc_list?.[16],dc_list?.[17],dc_list?.[18],dc_list?.[19]]

    console.log(type2)

     
    return(
      is_login?(
          <Div>
      {/* 유저 관심사 타입1 */}
        <InfoWrap>
          <Title>
          {dc_list?.[0]?.couponType}할인
          <Br> 다 모아두었어요</Br>
          </Title>
        {
        type1?.map((item) => {
          return (
            <DcList>
              <MainCoupon {...item}/>
            </DcList>
        );
        })
        
        }
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[0]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>
      {/* 유저 관심사 타입2 */}
        <InfoWrap>
        <Title>
          {dc_list?.[3]?.couponType}할인
          <Br> 다 모아두었어요</Br>
        </Title>

        {
        type2?.map((item) => {
          console.log(item)
          return (
            <DcList>
              <MainCoupon key={item?.id} {...item}/>
            </DcList>
        );
        })
        
        }
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[3]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>

        {/* 배열로 잘라화면을 그려서 각 타입별로 10개 정도 데이터를 넣어야 잘 작동할거임 */}
       {/* 유저 관심사 타입3 */}
        <InfoWrap>
        <Title>
          {dc_list?.[6]?.couponType}할인
          <Br> 다 모아두었어요</Br>
        </Title>

        {
        type3?.map((item) => {
          return (
            <DcList>
              <MainCoupon {...item}/>
            </DcList>
        );
        })
        
        }
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${dc_list?.[6]?.couponType}`);history.go(0)}}>더보기</Button>
        </BtWrap>
      {/* 유저 통신사 */}
      {/* <Title>
          {userMenu?.telecom}할인
          <Br> 다 모아두었어요</Br>
      </Title>

      <InfoWrap>
        {
        telecom?.map((item) => {
          return (
            <DcList>
              <MainCoupon {...item}/>
            </DcList>
        );
        })
        }
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${userMenu?.telecom}?page=1&size=6&sortBy=couponCreate&isAsc=true`);history.go(0)}}>더보기</Button>
        </BtWrap> */}
      {/* 유저 카드사 */}
      {/* <InfoWrap>
      <Title>
          {userMenu?.cardType}할인
          <Br> 다 모아두었어요</Br>
      </Title>

        {
        cards?.map((item) => {
          return (
            <DcList>
              <MainCoupon {...item}/>
            </DcList>
        );
        })
        }
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/api/categorydetail/${userMenu?.cardType}?page=1&size=7&sortBy=couponCreate&isAsc=true`);history.go(0)}}>더보기</Button>
        </BtWrap>
  */}
        </Div>
        
        ):(
<Wrap> 
  <P>로그인 먼저 해주세요!</P>
  <button onClick={()=>{history.push('/login')}}>로그인 하러 가기</button>
  <P2>앗! 아직 회원이 아니신가요?</P2>
  <button onClick={()=>{history.push('/signup')}}>회원가입하기 하러 가기</button>
</Wrap>)
    )    
}

const Div = styled.div`
width : 375px;
dispaly : block;
`
const InfoWrap = styled.ul`
width : 375px;
padding : 0;
`
const Wrap = styled.div`
width : 375px;
`
const P = styled.p`
font-weight : bold;
font-size : 30px;
color : rgb(59,59,59);
margin-bottom :10px;
`
const P2 = styled.p`
font-weight : bold;
margin-bottom :10px;
`
const DcList = styled.div`
margin-top : 20px;
`
const Button = styled.button`
width : 328px;
height : 48px;
font-size : 14px;
font-weight : 800;
color : white;
border : none;
border-radius : 4px;
background-color : #F09643;
`
const BtWrap = styled.div`
width : 328px;
height : 48px;
margin : 20px auto 60px auto;
`
const Title = styled.div`
width :200px;
height : auto;
margin : 0 0 0 20px;
font-size : 20px;
font-weight : 600;
`
const Br = styled.div`
margin-top : 8px;
font-size : 20px;
font-weight : 600;
`

export default LoginMain;