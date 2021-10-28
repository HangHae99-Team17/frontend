import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import styled from 'styled-components'
import InterestType from '../components/InterestType'

const LgMain = () => {
    const dispatch = useDispatch();
    const dc_list = useSelector(( state )=> state.main.list.data) 
    console.log(dc_list)
    React.useEffect(() => {
    dispatch(listCreators.getListMW())
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
            <DcList key={item.id}>
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