import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { colorBookmark, fullBookmark } from '../image';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';

const MainCoupon = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state)=>state.user.is_login);
    const [zzim,setZzim] = useState(props.couponSelect===1?true:false);
    
    const zzimz = () => {        
        if(zzim === false){
            if(props.mode === "rank"){
                dispatch(listCreators.rankaddzzimFB(props.id,zzim));
            }else if(props.mode === "search"){
                dispatch(listCreators.searchaddzzimFB(props.id,zzim));
            }
            setZzim(true);
        }else if(zzim === true){
            if(props.mode === "rank"){
                dispatch(listCreators.rankdelzzimFB(props.id,zzim));
            }else if(props.mode === "search"){
                dispatch(listCreators.searchdelzzimFB(props.id,zzim));
            }
            setZzim(false);
        }  
    };
    
    return (
        <div>
            <Wrap>
                <Box onClick={()=>{
                    history.push(`/api/detail/${props.id}`,props.mode)}}>
                    <ImgBox>
                        <IMG src={props.couponLogo}/>
                    </ImgBox>
                    <div>
                        <Title>{props.couponBrand}에서 </Title>
                        <Dsec><Strong>{props.couponSubTitle}</Strong> 할인 받기</Dsec>
                    </div>
                </Box>
                <Bookmarker>
                    {!is_login?(
                        <img src={colorBookmark} onClick={()=>{alert("로그인이 필요한 서비스 입니다!"); history.push('/login')}}/>
                    ):(
                        <img src={!zzim?colorBookmark:fullBookmark} onClick={zzimz}/>
                    )}
                </Bookmarker>
            </Wrap>
        </div>
    );
};

const Wrap = styled.div`
position : relative;
`
const Box = styled.div`
width : 360px;
height : 80px;
display : flex;
margin : 10px auto;
position : relative;
`
const ImgBox = styled.div`
width : 50px;
height : 50px;
border-radius : 4px;
margin : 16px 20px;
`
const IMG = styled.img`
width : 50px;
position:absolute;
top:33%;
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
top : 29px;
right : 24px;
`
const Strong = styled.span`
color : #F09643;
`

export default MainCoupon;