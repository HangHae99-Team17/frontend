import React, { useCallback } from "react";
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import { history } from "../redux/configureStore";
import { listCreators } from '../redux/modules/main';
import { actionCreators } from '../redux/modules/user';
import MainCoupon from '../components/MainCoupon';



const LoginMain = (props) => {
  const dispatch = useDispatch();
  // 유저 관심사, 카드사, 통신사 뽑아 오기
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu)
    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]
    console.log(MenuArr)
  // 로그인 여부를 확인하기 위함
    const is_login = useSelector((state) => state.user.is_login);

  // 디스패치 시에 type을 보내줘야 정보를 가지고 올 수 있다.
    React.useEffect(()=>{
      function list(){
        // 확인을 위해 삼항 조건연산자 사용
        if(MenuArr.length > 0){
      const type = [MenuArr[0],MenuArr[1],MenuArr[2],MenuArr[3],MenuArr[4]]
      console.log(type[0],typeof(type))
       dispatch(listCreators.getListMW(MenuArr[1],1,4));
       dispatch(listCreators.getListMW(MenuArr[2],1,4));
        }
    }
    list()}
    ,[userMenu])
    // 리덕스에서 할인정보 리스트 가지고 오기
    const dc_list = useSelector(( state )=> state.main.pagingList);
    console.log(dc_list)

     
    return(
        is_login?(
          <Div>
        <InfoWrap>
        {
        dc_list?.map((coupon) => {
          return (
            <DcList>
              <MainCoupon key={coupon.id} {...coupon}/>
            </DcList>
        );
        })}
        </InfoWrap>
        <BtWrap>
          <Button onClick={()=>{history.push(`/category`)}}>더보기</Button>
        </BtWrap>

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
`
const InfoWrap = styled.ul`
width : 375px;
padding-left : 16px;
`
const Wrap = styled.div`
width : 375px;
margin : auto;
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
margin : auto;
`


export default LoginMain;