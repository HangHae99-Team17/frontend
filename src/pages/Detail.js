import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";
import { foldersCreators } from '../redux/modules/folders';

const Detail = (props) => {
    // 해당 할인 정보 id값만 추출하기
    const Id = props.match.params.id
    console.log(Id)

    const dispatch = useDispatch();
    // 리덕스에서 info를 불러올때 해당 Id값의 info만 불러올 수 있도록 디스패치 해준다.
    // 액션이 먼저 발생하고 리덕스의 값을 데리고 와야 하기 때문에 디스패치 먼저 해준다.
    React.useEffect(()=>{
        dispatch(detailCreators.getDetailMW(Id))
    },[])

    // 리덕스에서 데이터 가지고 오기
    const detail_list = useSelector((store) => store.detail.info.data );
    console.log(detail_list?.couponImage)

    // 찜한 쿠폰 백에 보내주기post
    // api에서 적은 couponId 가 아래 couponId이다. jason 형태로 보내져야 하는 것.
    function PostCoupon(){
        const couponId = {
            couponId : Id
        };
        // 디스패치 할 때 couponId를 넘겨준다.
        dispatch(foldersCreators.addPostMW(couponId));
    } 


    return(
        <Wrap>
            <Info>
            <h1>쿠폰 상세 페이지</h1>
            <Image>{detail_list?.couponImage}</Image>
            <TakeCoupon>
            <Type>{detail_list?.couponType}</Type>
            <Button onClick={PostCoupon}> 찜하기 </Button>
            </TakeCoupon>
            <div>{detail_list?.couponTitle}</div>
            <div>{detail_list?.couponDesc}</div>
            <div>{detail_list?.couponUrl}</div>
            </Info>
        </Wrap>
    )
}

const Wrap = styled.div`
width : 100vw;
height : 100vh;
`
const TakeCoupon = styled.div`
width : 300px;
display : flex;
margin : auto;
position : relative;
`
const Type = styled.div`
width :  60px;
height : 25px;
border :  none;
line-height : 25px;
background-color : rgb(239, 239, 239);
border-radius : 15px;

margin : 15px;
`
const Button = styled.button`
width :  60px;
height : 25px;
position : absolute ;
left : 215px;
margin : 15px;
border :  none;
border-radius : 15px;
cursor : pointer;
background-color : rgb(59, 59, 59);
color : white;
font-weight : bold;
`
const Info = styled.div`
margin : 20px;
text-align : center;
`
const Image = styled.div`
width : 300px;
height : 200px;
border : 1px solid grey;
text-align: center;
margin : 20px auto;
`
export default Detail;