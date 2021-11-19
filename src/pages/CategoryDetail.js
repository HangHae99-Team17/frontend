import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Grid from "../elements/Grid";
import { colorBookmark, couponCreate,couponDespire,couponRank } from '../image';
import {actionCreators  as foldersCreators } from '../redux/modules/salebox';
import InfiniteScroll from 'react-infinite-scroll-component';

const CategoryDetail = (props) => {
    const dispatch = useDispatch();
    // 넘어온 props 확인해서 내가 보내줘야 할 타입을 추출
    const type = props.match.params.type
    const is_login = useSelector((state)=>state.user.is_login)  

    // 무한스크롤 페이지_초기값1
    const [page,setPage] = useState(1)
    const [sortBy,setSortBy] =useState("couponCreate")
    const [isAsc,setIsAsc] = useState(true)
    // 리덕스에있는 데이터 불러오기(리듀서 정보_hasMore,pagingList)
    const DcInfoList = useSelector((state) => state.main.pagingList)
      console.log(DcInfoList,page,sortBy)
    const hasMore =  useSelector((state) => state.main.hasMore)
    console.log(hasMore)

    React.useEffect(() => {
      // 내가 넘겨줄 값들 _ 타입, 현재 페이지, 몇개보여줄건지, 정렬기준,isAsc
      console.log(sortBy,isAsc,type,page);        
      dispatch(listCreators.getListMW(type,page,6,sortBy,isAsc));
      }, [sortBy]);



      // 스크롤이 마지막에 닿았을때 다음 페이지로 이동시켜주는 함수
      const fetchPaging = () => {
        // 페이지 상태 변화
        setPage(page + 1)
        setTimeout(() => {
            if(hasMore){
              dispatch(listCreators.getListMW(type,page,2,sortBy,isAsc));
            }
        },1000)
    }


return(
    <Grid width="375px" >
        <div>
        <P>{type} 할인</P>
        <P>다 모아두었어요</P>
        </div>
        <SortBy>
          <SortImg src ={couponCreate} 
            onClick={()=>{
              setSortBy("couponCreate");
              setIsAsc(true);
            }}/>
          <SortImg src ={couponDespire} 
            onClick={()=>{
              setSortBy("couponDespire");
              setIsAsc(true);
            }}/>
          <SortImg src ={couponRank} 
            onClick={()=>{
              setSortBy("couponLike");
              setIsAsc(false);
            }}/>
        </SortBy>
  {DcInfoList?
    <InfiniteScroll
    dataLength={DcInfoList.length}
    next={fetchPaging}
    hasMore={hasMore}
    loader={hasMore?<h4 style={{marginLeft : "16px"}}>다음 할인이 궁금하다면 스크롤을 내려주세요!</h4>:
        <h4 style={{marginLeft : "16px"}}>아쉽게도 더이상의 할인이 없네요</h4>}>  
      <DcBox>
        {
        DcInfoList?.map((item) => {
          return (
            <Wrap>
            <DcList key={item.id} onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                <Img> <img src = {item.couponLogo}/> </Img>
              <DcInfo>
              <Text>{item.couponBrand}에서</Text>
              <Text2>{item.couponSubTitle} 할인 받기</Text2>
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
    </InfiniteScroll>
    : <div>할인 정보가 없습니다!</div>
    }
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
const SortBy = styled.div`
width : 200px;
display : flex;
`
const SortImg = styled.img`
width : 50px;
height : 14px;
margin : 20px 0 0 16px;
`
const DcBox = styled.div`
width : 375px;
margin: 0 auto 20px auto;
`
const DcList = styled.div`
text-aling : center;
padding : 5px;
cursor : pointer;
display : flex;
margin-top :20px
`
const DcInfo = styled.div`
margin : 0 8px;
`
const Text =styled.p `
font-size : 14px;
`
const Wrap = styled.div`
position : relative;
width : 100%;
height : 72px;
`
const Text2 =styled.p `
font-weight: bold;
margin-top:-6px;
color : #FF8F00;
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