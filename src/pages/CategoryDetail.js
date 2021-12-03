import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainCoupon from '../components/MainCoupon';

const CategoryDetail = (props) => {
    const dispatch = useDispatch();
    // 넘어온 props 확인해서 내가 보내줘야 할 타입을 추출
    const type = props.match.params.type;

    // 무한스크롤 페이지_초기값1
    const [page,setPage] = useState(1)
    // 리덕스에있는 데이터 불러오기(리듀서 정보_hasMore,pagingList)
    const DcInfoList = useSelector((state) => state.main.pagingList)
    const hasMore =  useSelector((state) => state.main.hasMore)
    

    React.useEffect(() => {
      // 내가 넘겨줄 값들 _ 타입, 현재 페이지, 몇개보여줄건지, 정렬기준,isAsc
      dispatch(listCreators.getListMW(type,page,7,"couponCreate",true));
      setPage(prevstate =>prevstate + 1)
      // 언마운트될 때 리덕스에서 포스트 데이터 없애기
      return()=>{
        dispatch(listCreators.clearList())
      }
      }, [dispatch]);



      // 스크롤이 마지막에 닿았을때 다음 페이지로 이동시켜주는 함수
      const fetchPaging = () => {
        // 페이지 상태 변화
        setTimeout(() => {
            if(hasMore){
              dispatch(listCreators.getListMW(type,page,7,"couponCreate",true));
              setPage(prevstate =>prevstate + 1)
            }

        },1000)
    }


return(
    <AllBox>
        <div>
        <P>{type} 할인</P>
        <P>다 모아두었어요</P>
        </div>
        <SortBy>
        <SortImg
            onClick={()=>{history.push(`/ranking/${type}/${"couponCreate"}/${false}`);history.go(0)}}>✓ 최신순</SortImg>
          <SortImg
            onClick={()=>{history.push(`/ranking/${type}/${"couponDespire"}/${false}`);history.go(0)}}>✓ 마감임박</SortImg>
          <SortImg
            onClick={()=>{history.push(`/ranking/${type}/${"couponLike"}/${false}`);history.go(0)}}>✓ 인기순</SortImg>
        </SortBy>
  {DcInfoList?
    <InfiniteScroll
    dataLength={DcInfoList.length}
    next={fetchPaging}
    hasMore={hasMore}
    loader={<h4 style={{marginLeft : "30px", marginTop : "30px"}}>다음 할인이 궁금하다면 스크롤을 내려주세요!</h4>}>  
      <DcBox>
        {
        DcInfoList?.map((item) => {
          return (
            <Wrap>
              <MainCoupon {...item} key={item.id} mode="rank" mini="mini"/>
            </Wrap>
          );
        })} 
      </DcBox>
    </InfiniteScroll>
    : <div>할인 정보가 없습니다!</div>
    }
    </AllBox>
  ) 
}

const AllBox = styled.div`
width:375px;
margin:0 auto;
`
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
margin-left:20px;
width : 300px;
display : flex;
`
const SortImg = styled.div`
  margin-right: 8px;
  cursor:pointer;
  width : 67px;
  height : 16px;
  font-size : 14px;
  color : rgb(189,189,189);
  font-weight : 600;

`
const DcBox = styled.div`
position:relative;
width : 375px;
margin: 0 auto 20px auto;
`
const Wrap = styled.div`
position : relative;
width : 100%;
height : 72px;
`


export default CategoryDetail;