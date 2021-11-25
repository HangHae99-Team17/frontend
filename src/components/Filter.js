import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Grid from "../elements/Grid";
import { couponCreate,couponDespire,couponRank } from '../image';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainCoupon from './MainCoupon';

const Filter = (props)=>{
    console.log(props)
    const dispatch = useDispatch();
    // 넘어온 props 확인해서 내가 보내줘야 할 타입을 추출
    const type = props.match.params.type
    const sortBy= props.match.params.sortby
    const isAsc = props.match.params.isasc

    // 무한스크롤 페이지_초기값1
    const [page,setPage] = useState(1)
    // 리덕스에있는 데이터 불러오기(리듀서 정보_hasMore,pagingList)
    const DcInfoList = useSelector((state) => state.main.pagingList)
    const hasMore =  useSelector((state) => state.main.hasMore)
    console.log(hasMore)

    React.useEffect(() => {
      // 내가 넘겨줄 값들 _ 타입, 현재 페이지, 몇개보여줄건지, 정렬기준,isAsc
      dispatch(listCreators.getListMW(type,page,6,sortBy,isAsc));
      setPage(prevstate =>prevstate + 6)
      }, []);



      // 스크롤이 마지막에 닿았을때 다음 페이지로 이동시켜주는 함수
      const fetchPaging = () => {
        // 페이지 상태 변화
        setPage(prevstate =>prevstate + 1)
        setTimeout(() => {
            if(hasMore){
              dispatch(listCreators.getListMW(type,page,1,"couponLike",false));
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
        <SortImg src ={couponCreate} 
            onClick={()=>{history.push(`/ranking/${type}/${"couponCreate"}/${true}`);history.go(0) }}/>
          <SortImg src ={couponDespire} 
            onClick={()=>{history.push(`/ranking/${type}/${"couponDespire"}/${true}`);history.go(0)}}/>
          <SortImg src ={couponRank} 
            onClick={()=>{history.push(`/ranking/${type}/${"couponLike"}/${false}`);history.go(0)}}/>
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
                      <MainCoupon {...item} key={item.id}/>
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
width : 200px;
display : flex;
`
const SortImg = styled.img`
width : 50px;
height : 14px;
margin : 20px 0 0 16px;
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

export default Filter;