import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components'
import InterestType from '../components/InterestType'
import { history } from "../redux/configureStore";


const LgMain = (props) => {
    const dispatch = useDispatch();

    // history가 이동되면서 받은 props가 뭐가있는지 찍어본다.
    console.log(props)

    // 내가 디스패치 하면서 넘겨줄 값(여기선 type이 됩니다)
    // 이 type이 우리가 api에서 적어둔 param 부분이 됩니다.
    const type = props.match.params.type
    console.log(type)

    // 내가 받아올 type의 할인정보 데이터들(리스트)
    const dc_list = useSelector(( state )=> state.main.list.data);
    console.log(dc_list)
    
    // 디스패치 시에 type을 넣어줘야 request를 제대로해서 데려옵니다.
     React.useEffect(() => {
    dispatch(listCreators.getListMW(type))
    }, []);
    

return(
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
export default LgMain