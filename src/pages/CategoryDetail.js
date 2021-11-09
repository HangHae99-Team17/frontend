import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Grid from "../elements/Grid"

const CategoryDetail = (props) => {
    const dispatch = useDispatch();
    // 내가 넘겨줘야 할 값이 뭔지 props를 통해서 찾아내기
    // 내가 넘겨줄 타입
    console.log("디테일",props)
    const type = props.match.params.type
    // 내가 가지고 올 타입 디스패치
    React.useEffect(() => {
        dispatch(listCreators.getListMW(type))
        }, []);
        
    const DcInfoList = useSelector((state) => state.main.list.data)
    console.log(DcInfoList)

return(
    <Grid width="375px" >
        <div>
        <P>{type} 할인</P>
        <P>다 모아두었어요</P>
        </div>
    <DcBox>
        {
        DcInfoList?.map((item) => {
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
    </DcBox>
    </Grid>
)
}


const P = styled.p`
margin: 0 auto;
font-size : 18px;
width: 355px;
line-height:30px;
font-weight : bold;
padding-left:20px;
`
const DcBox = styled.div`
width : 375px;
margin: 20px auto;
`
const DcList = styled.div`
text-aling : center;
padding : 5px;
cursor : pointer;
display : flex;
`
const DcInfo = styled.div`
margin : 0 5px;
`
const Text =styled.p `
font-size : 13px;
`
const Img = styled.span`
width : 40px;
height : 40px;
border : 1px solid grey;
margin : 18px;
border-radius:5px;
`
export default CategoryDetail;