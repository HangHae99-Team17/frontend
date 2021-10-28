import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";

const Detail = (props) => {
    // 해당 할인 정보 id값만 추출하기
    const Id = props.match.params.id

    const dispatch = useDispatch();
    // 리덕스에서 데이터 가지고 오기
    const detail_list = useSelector((state) => state.detail.info );
    console.log(detail_list)

    // 리덕스에서 info를 불러올때 해당 Id값의 info만 불러올 수 있도록 디스패치 해준다.
    React.useEffect(()=>{
        dispatch(detailCreators.getDetailMW(Id))
    },[])
    return(
        <Wrap>
            <Info>
            <h1>쿠폰 상세 페이지</h1>
            <Image>이미지 들어갈 부분</Image>
            <div>할인 상품 이름</div>
            <div> 할인 사용처 url</div>
            </Info>
        </Wrap>
    )
}

const Wrap = styled.div`
width : 100vw;
height : 100vh;
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