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
    // axios에 적은 param이 저 type이다.
     React.useEffect(() => {
    dispatch(listCreators.getListMW(type))
    }, []);
    

return(is_login?(
    <div>
    메인 페이지가 될 것 입니다.
    <Menu>
      <InterestType/>
    </Menu>
    <DcBox>
        {
        dc_list?.map((item) => {
          return (
            <DcList key={item.id} onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                <Img>{item.couponImage}</Img>
              <DcInfo>
              <Text>{item.couponTitle}</Text>
              <Text>{item.couponDespire}</Text>
              </DcInfo>
            </DcList>
          );
        })}
         <Button onClick={()=>{history.push(`/api/categorydetail/${type}`)}}>더보기</Button>
    </DcBox>
    </div>
      ):(
        <div></div>
        )
  )
}

const Menu = styled.div`
width : 300px;
margin : auto;
`

const DcBox = styled.div`
width : 250px;
height : 80px;
margin: 20px auto;
`
const DcList = styled.div`
margin : 10px 0 ;
text-aling : center;
border : 1px solid grey ; 
padding : 5px;
cursor : pointer;
display : flex;
`
const DcInfo = styled.div`
margin : 0 15px;
`
const Text =styled.p `
font-size : 12px;
`
const Img = styled.span`
withd : 50px;
height : 50px;
border : 1px solid grey;
margin : 6px 0;
`
const Button = styled.button`
width : 250px;
height : 20px;
`
export default LgMain