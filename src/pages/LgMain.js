import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { foldersCreators } from '../redux/modules/folders';
import styled from 'styled-components'
import InterestType from '../components/InterestType'
import { history } from "../redux/configureStore";
import { colorBookmark, companyLogo,fullBookmark } from '../image';


const LgMain = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);


    // 내가 디스패치 하면서 넘겨줄 값(여기선 type)
    // 이 type이 우리가 api에서 적어둔 param 부분
    const type = props.match.params.type

    // 내가 받아올 type의 할인정보 데이터들(리덕스 데이터 데리고 오기)
    const dc_list = useSelector(( state )=> state.main.list.data);
    console.log(dc_list)
    
    // 디스패치 시에 type을 넣어줘야 request를 제대로해서 데려옵니다.
    // axios에 적은 param이 저 type이다.
     React.useEffect(() => {
    dispatch(listCreators.getListMW(type));
    }, []);
    


return(is_login?(
    <div>
      <InterestType/>
      <Title>
      <TypeTitle>{type}</TypeTitle>
      <TypeTitle>이런 할인 어때요?</TypeTitle>
      </Title>
        {
        dc_list?.map((item) => {
          return (
            <DcWrap key={item.id}>
              <DcList onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
              <Img>{} <img src={companyLogo}/> </Img>
              <DcInfo>
              <Text>{item.couponTitle}에서</Text>
              <Subtitle><Strong>{item.couponDesc}</Strong> 할인 받기</Subtitle>
              </DcInfo>
              </DcList>
              <div>
                <Bookmarker src={colorBookmark} onClick={()=>{
                const couponId = {couponId : item.id};
                dispatch(foldersCreators.addPostMW(couponId));
                alert("해당 쿠폰이 찜 되었습니다!") }}/>
              </div>

            </DcWrap>
          );
        })}
        <BtWrap>
         <Button onClick={()=>{history.push(`/api/categorydetail/${type}`)}}>더보기</Button>
        </BtWrap>
    </div>
      ):(
        <div></div>
        )
  )
}

const Title = styled.div`
margin-top : 20px;
`
const TypeTitle = styled.p`
margin : 5px 0 0 16px ;
font-size : 20px;
font-weight : 600;
`
const DcList = styled.div`
border : 1px solid #fff ; 
cursor : pointer;
display : flex;
`
const DcWrap = styled.div`
margin : 10px 16px ;
position : relative;
`
const DcInfo = styled.div`
margin : 0 15px;
`
const Bookmarker = styled.img`
position : absolute;
right : 10px;
top : 26px;
`
const Text =styled.p `
margin : 8px 0 0 0;
font-size : 14px;
font-weight : 400;
color : #757575;
`
const Subtitle = styled.p`
margin : 10px 0 0 0 ;
font-size : 16px;
font-weight : 400; 
`
const Strong = styled.span`
color : #F09643;
`
const Img = styled.span`
width : 50px;
height : 50px;
border : 1px solid #DADADA;
border-radius : 4px;
margin : 6px 0;
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
export default LgMain