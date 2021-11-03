import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components'
import InterestType from '../components/InterestType'
import { history } from "../redux/configureStore";


const LgMain = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    // history가 이동되면서 받은 props가 뭐가있는지 확인.
    console.log(props)

    // 내가 디스패치 하면서 넘겨줄 값(여기선 type)
    // 이 type이 우리가 api에서 적어둔 param 부분
    const type = props.match.params.type
    console.log(type)

    // 내가 받아올 type의 할인정보 데이터들(리덕스 데이터 데리고 오기)
    const dc_list = useSelector(( state )=> state.main.list.data);
    console.log(dc_list)
    
    // 디스패치 시에 type을 넣어줘야 request를 제대로해서 데려옵니다.
     React.useEffect(() => {
    dispatch(listCreators.getListMW(type))
    }, []);
    

return(is_login?(
    <div>
    메인 페이지가 될 것 입니다.
    <div>
      <InterestType/>
    </div>
    <DcBox>
        {
        dc_list?.map((item) => {
          return (
            <DcList key={item.id} onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                <Img>{item.couponImage}</Img>
              <Text>{item.couponTitle}</Text>
              <Text>{item.couponDespire}</Text>
            </DcList>
          );
        })}
    </DcBox>
    </div>
      ):(<Wrap> 
  <P>로그인 먼저 해주세요!</P>
  <button onClick={()=>{history.push('/login')}}>로그인 하러 가기</button>
  <P2>앗! 아직 회원이 아니신가요?</P2>
  <button onClick={()=>{history.push('/signup')}}>회원가입하기 하러 가기</button>
</Wrap>)
  )
}

const DcBox = styled.div`
height : 80px;
display : flex;
margin : 20px;
`
const DcList = styled.div`
margin-left : 15px;
text-aling : center;
border : 1px solid grey ; 
padding : 5px;
cursor : pointer;
`
const Text =styled.p `
font-size : 12px;
`
const Img = styled.span`
withd : 200px;
height : 50px;
border : 1px solid grey;
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
export default LgMain