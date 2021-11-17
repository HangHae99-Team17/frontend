import React,{useState,useLayoutEffect, useEffect} from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { colorBookmark, companyLogo, fullBookmark } from '../image';
import { useSelector,useDispatch } from 'react-redux';
import {actionCreators as foldersCreators } from '../redux/modules/salebox';
import { listCreators } from '../redux/modules/main';

const MainCoupon = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state)=>state.user.is_login);
    const num = props.couponSelect
    const [zzim,setZzim] = useState();
    
    const zzimz = () => {
        if(is_login===false){
            alert("로그인이 필요한 서비스 입니다!");
            history.push('/login')
        }

        if(zzim === false){
            dispatch(foldersCreators.addPostMW(props.id,zzim));
            dispatch(listCreators.addZzim(props.id,zzim))
            setZzim(true);
        }else if(zzim === true){
            dispatch(foldersCreators.addPostMW(props.id,zzim));
            dispatch(listCreators.addZzim(props.id,zzim))
            setZzim(false);
        }   
    };

    useEffect(()=>{
        if(props){
            if(num === 1){
                setZzim(true);
                console.log(num)
            }else if(num === 0){
                setZzim(false);
                console.log(num)
            }
        }
    },[num])

    return (
        <div>
            <Wrap>
                <Box onClick={()=>{history.push(`api/detail/${props.id}`)}}>
                    <ImgBox>
                        <img src={props.companyLogo}/>
                    </ImgBox>
                    <div>
                        <Title>{props.couponTitle}에서 </Title>
                        {/* couponDesc이 부분은 subtitile로 바꿔서 받을예정_ api 바꾸고 변경하기 */}
                        <Dsec><Strong>{props.couponSubTitle}</Strong> 할인 받기</Dsec>
                    </div>
                </Box>
                <Bookmarker>
                    {!is_login?(
                        <img src={colorBookmark}/>
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

export default MainCoupon;