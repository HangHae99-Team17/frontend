import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components'
import { history } from "../redux/configureStore";



const InterestType = (props) => {
  const dispatch =useDispatch();
  // 회원가입시에 유저가 선택한 타입들을 뽑기 위해서 user을 갖고 옴
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu)
  // 유저메뉴는 로그인 시에만 보여줘야 하기때문에 is_login을 불러온다.
    const is_login = useSelector((state) => state.user.is_login);
    console.log(is_login)
  // user로 필요한 정보를 가지고 왔지만, 딕셔너리 형태일뿐더러 필요없는 정보들도 포함되어있음
  // 그래서 필요한 정보만 추출해서 배열로 만들어줌(map을 돌리기 위해서)
    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]
    console.log(MenuArr)

    React.useEffect(() => {
      dispatch(listCreators.getListMW(userMenu?.type1))
      }, []);
      const dc_list = useSelector(( state )=> state?.main?.list?.data);
    console.log(dc_list)


    return(
        is_login?(
        <div>
        <BarWrap>
        {
        MenuArr?.map((item) => {
          return (
                //목록을 누르면 history가 넘어가도록 한다.(백에 type을 보내줘야 하기때문에)
                // history.go(0) -> 새로고침을 안해도 카테고리를 옮길 수 있도록 하는것
                <Bar onClick={()=>{history.push(`/api/main/${item}`); history.go(0)}}>{item}</Bar>
        );
        })}
        <div>
          {dc_list?.map((item)=>{
          <div>{item}</div>
        })}
        </div>
        </BarWrap>
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
margin : 10px;
cursor : pointer;
font-size : 15px;
`
const BarWrap = styled.ul`
padding-left : 13px; 
`
const Wrap = styled.div`
width : 400px;
height : 400px;
margin : auto;
text-align : center;
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