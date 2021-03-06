// 리스트를 가지고 오는 리덕스
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const GET_LIST = 'GET_LIST';
// 오늘 마감되는 쿠폰
const DEL_TODAY = 'DEL_TODAY'
// 언마운트시 리스트 비워줄 액션
const CLEAR_LIST = 'list/CLEAR_LIST';

// 액션 생성 함수
const getList = createAction(GET_LIST, (list) => ({list}));
const clearList = createAction(CLEAR_LIST);
const todayDes = createAction(DEL_TODAY, (desList)=>({desList}));

// 초기값 설정
const initialState = {
  list: [],
  desList: [],
  // 무한스크롤 초기값 설정
  hasMore : true,
  loading : true,
  pagingList : [],
};

// 리스트 가지고 오는 미들웨어_백에서 받아올땐 시간이 걸리기 때문에 async사용
const getListMW = (type,page,size,sortBy,isAsc) => {
  return async (dispatch) => {
      const response = await apis.getList(type,page,size,sortBy,isAsc)
      if(response){
      dispatch(getList(response.data.data));
    }
    else{
      console.log(response.error);
    }
  };
};
// 오늘 마감인 쿠폰 가지고 오는 미들웨어
const todayDesMW = ()=>{
  return async (dispatch)=>{
    try{
     const response = await apis.todayDes()
     dispatch(todayDes(response.data.data))
      }
    catch(e){console.log(e)}
  }
}
// 리듀서
export default handleActions(
  {
    [GET_LIST]: (state, action) =>
      produce(state, (draft) => {
        // 데이터가 undefined가 아니라면, hasMore의 Boolean값을 반환해준다.
        if(action.payload !== undefined) {
          // 데이터가 있다면 true를, 없다면 이라면 false를 반환(조건 삼항연산자)
          // 다음 페이지가 있는지 확인
          draft.hasMore = action.payload?.list?.length > 0? true : false
        }
        else{
          draft.hasMore = false
        }
        
        // hasMore가 false라면 빈 배열을, true면 list의 데이터가 포함된 배열을 반환한다.
        draft.pagingList = draft.hasMore===false?draft.pagingList : draft.pagingList.concat(action.payload.list)
      }),
    [CLEAR_LIST]:()=>initialState,
    [DEL_TODAY]:(state,action)=>
      produce(state, (draft)=>{
        draft.desList = action.payload.desList
      })
  },
  initialState
);

const listCreators = {
  getListMW,
  clearList,
  todayDesMW
};

export { listCreators };
