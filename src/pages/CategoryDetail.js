import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Grid from "../elements/Grid";
import { colorBookmark, companyLogo } from '../image';
import { foldersCreators } from '../redux/modules/folders';

const CategoryDetail = (props) => {
    const dispatch = useDispatch();
    console.log("디테일",props)
    const type = props.match.params.type
    React.useEffect(() => {
        dispatch(listCreators.getListMW(type))
        }, []);

    const is_login = useSelector((state)=>state.user.is_login)
        
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
            <Wrap>
            <DcList key={item.id} onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                <Img>{item.couponImage}</Img>
              <DcInfo>
              <Text>{item.couponTitle}에서</Text>
              <Text2><Text3>{item.couponSubTitle}</Text3>할인 받기</Text2>
              </DcInfo> 
              </DcList>

              <Imgbox><img src={colorBookmark} onClick={()=>{
                if(is_login){
                const couponId = {couponId : item.id};
                dispatch(foldersCreators.addPostMW(couponId));
                alert("해당 쿠폰을 찜했습니다!")}
                else{alert("로그인이 필요한 서비스 입니다!")}}}/></Imgbox>
            </Wrap>
          );
        })}
        
    </DcBox>
    </Grid>
)
}


const P = styled.p`
margin: 0 auto;
font-size : 20px;
width: 355px;
line-height:30px;
font-weight : bold;
padding-left:20px;
padding-top: 3px;
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
margin : 0 8px;
`
const Text =styled.p `
font-size : 14px;
`
const Wrap = styled.div`
position : relative;
width : 100%
height : 72px;
`
const Text2 =styled.p `
font-weight: bold;
margin-top:-6px;
`
const Text3 =styled.p `
font-weight: bold;
color:#DADADA;
`

const Img = styled.span`
width : 40px;
height : 40px;
border : 1px solid grey;
margin : 18px;
border-radius:5px;
`
const Imgbox = styled.div`
width:20px;
height:20px;
position:absolute;
right:25px;
top : 38%;
`


export default CategoryDetail;