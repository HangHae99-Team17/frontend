import React,{useState} from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { colorBookmark, fullBookmark } from '../image';
import { useSelector } from 'react-redux';
import { apis } from '../common/axios';

const MainCoupon = (props) => {

    const is_login = useSelector((state)=>state.user.is_login);
    const [zzim,setZzim] = useState(props.couponSelect===1?true:false);
    
    const zzimz = async() => {
        if(is_login===false){
            alert("로그인이 필요한 서비스 입니다!");
            history.push('/login')
        }      
        
        if(zzim === false){
            await apis.postCoupon(props.id);
            setZzim(true);
        }else if(zzim === true){
            await apis.delFolders(props.id);
            setZzim(false);
        }  
    };

    return (
        <div>
            <Wrap>
                <Box onClick={()=>{history.push(`/api/detail/${props.id}`)}}>
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
display: flex;
`
const Box = styled.div`
width : 300px;
height : 80px;
display : flex;
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
width : 46px;
height : 78px;
text-align: center;
img{
    margin-top:30px;
}

`
const Strong = styled.span`
color : #F09643;
`

export default MainCoupon;