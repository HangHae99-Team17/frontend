import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { foldersCreators } from '../redux/modules/folders';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import { colorBookmark, companyLogo,fullBookmark } from '../image';

const Main = ()=>{
    const dispatch = useDispatch();

    React.useEffect(()=>{
        
        dispatch(listCreators.getDcListMW())
    },[])

    const list = useSelector((state)=>state.main.rank.data);
    const is_login = useSelector((state)=>state.user.is_login)
    console.log(list)
    return(
        <div>
            <P>아는만큼</P>
            <P>아낄 수 있게</P>
            {list?.map((item)=>{
                return(
                    <Wrap>
                        <Box onClick={()=>{history.push(`api/detail/${item.id}`)}}>
                        <ImgBox><img src={companyLogo}/></ImgBox>
                        <div>
                            <Title>{item.couponTitle}에서 </Title>
                            {/* couponDesc이 부분은 subtitile로 바꿔서 받을예정_ api 바꾸고 변경하기 */}
                            <Dsec><Strong>{item.couponSubTitle}</Strong> 할인 받기</Dsec>
                        </div>
                        </Box>
                        <Bookmarker onClick={()=>{ 
                        if(is_login===false){alert("로그인이 필요한 서비스 입니다!");
                            history.push('/login')} 
                        else {const couponId = {couponId : item.id};
                            dispatch(foldersCreators.addPostMW(couponId));
                        alert("해당 쿠폰이 찜 되었습니다!")}}}>
                        <img src={colorBookmark}/>
                    </Bookmarker>
                    </Wrap>
            );
            })}
        </div>
    )
}
const Wrap = styled.div`
position : relative
`
const P = styled.p`
margin : 10px 0 0 16px;
font-size : 20px;
font-weight : 700;
`
const Box = styled.div`
width : 375px;
height : 80px;
display : flex;
margin : 10px auto;
position : relative;
`
const ImgBox = styled.div`
width : 50px;
height : 50px;
border : 1px solid #DADADA;
border-radius : 4px;
margin : 16px;
`
const Title = styled.p`
font-size :14px;
font-weight :400;
color : #757575;
`
const Dsec = styled.p`
font-size : 16px;
font-weight : 400;
`
const Bookmarker = styled.div`
width : 18px;
height : 18px;
position :absolute;
top : 30px;
right : 20px;
`
const Strong = styled.span`
color : #F09643;
`
export default Main;