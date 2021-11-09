import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import { history } from "../redux/configureStore";
import { listCreators } from '../redux/modules/main';
import { colorBookmark, companyLogo,fullBookmark } from '../image';
import { foldersCreators } from '../redux/modules/folders';



const InterestType = (props) => {
  const dispatch = useDispatch();
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu)
    const is_login = useSelector((state) => state.user.is_login);
    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]
    console.log(MenuArr)



    return(
        is_login?(
          <div>
        <BarWrap>
        {
        MenuArr?.map((item) => {
          return (
              <Bar onClick={()=>{history.push(`/api/main/${item}`);history.go(0)}}>{item}</Bar>
        );
        })}
        </BarWrap>
        <Line/>
        </div>
        ):(
<Wrap> 
  <P>로그인 먼저 해주세요!</P>
  <button onClick={()=>{history.push('/login')}}>로그인 하러 가기</button>
  <P2>앗! 아직 회원이 아니신가요?</P2>
  <button onClick={()=>{history.push('/signup')}}>회원가입하기 하러 가기</button>
</Wrap>)
    )    
}

const Bar = styled.li`
display : inline-block;
margin : 0 16px;
cursor : pointer;
font-size : 16px;
font-weight : 600 ;
`
const BarWrap = styled.ul`
width : 375px;
padding-left : 16px;
`
const Line = styled.hr`
width : 100%;
color : #D5D5D5;
`
const Wrap = styled.div`
width : 400px;
height : 400px;
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

export default InterestType;