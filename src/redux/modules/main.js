// 리스트를 가지고 오는 리덕스
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const GET_LIST = 'GET_LIST';
const GET_DCLIST = 'GET_DCLIST';
const RANK_ZZIM = 'RANK_ZZIM';
const SEARCH_ZZIM = 'SEARCHZZIM';
const SEARCH = 'SEARCH';

// 액션 생성 함수
const getList = createAction(GET_LIST, (list) => ({list}));
const getDcList = createAction(GET_DCLIST, (rank)=>({rank}));
const rankzzim = createAction(RANK_ZZIM,(coupon_id,zzimval)=>({coupon_id,zzimval}));
const searchzzim = createAction(SEARCH_ZZIM,(coupon_id,zzimval)=>({coupon_id,zzimval}));
const search = createAction(SEARCH, (search_list)=>({search_list}));

// 초기값 설정
const initialState = {
  list: [],
  rank: [],
  // 무한스크롤 초기값 설정
  hasMore : true,
  loading : true,
  pagingList : [],
  searchList:[],
};


const searchListFB = (searchval) => {
  return async (dispatch, { history }) => {
    try{
      
      const res = await apis.searchCoupon(searchval);
      if(res.data.result==="failed"){
        dispatch(search([]));
      }else{
        dispatch(search(res.data.data));
      }
      
    }catch(e){
      console.log(e);
    }
  }
}


// 리스트 가지고 오는 미들웨어_백에서 받아올땐 시간이 걸리기 때문에 async사용
const getListMW = (type,page,size,sortBy,isAsc) => {
  return async (dispatch) => {
    try{
      const res = await apis.getList(type,page,size,sortBy,isAsc)
      dispatch(getList(res.data.data));
    }catch(e){
      console.log(e);
    }
  };
};

// 로그인 전 메인페이지 랭킹 리스트 가져오는 미들웨어 
export const getDcListMW = ()=>{
  return async (dispatch)=>{
    try{
      const res = await apis.getDcList();
      dispatch(getDcList(res.data.data));
    }catch(e){
      console.log(e);
    }
  }
}

export const rankaddzzimFB = (id,zzimval) => {
  return async (dispatch) => {
    try{
      const res = await apis.postCoupon(id);
      console.log(res);
      dispatch(rankzzim(id,zzimval));
    }catch(e){
      console.log(e);
    }
  }
}

export const rankdelzzimFB = (id,zzimval) => {
  return async (dispatch) => {
    try{
      const res = await apis.delFolders(id);
      console.log(res);
      dispatch(rankzzim(id,zzimval));
    }catch(e){
      console.log(e);
    }
  }
}

export const searchaddzzimFB = (id,zzimval) => {
  return async (dispatch) => {
    try{
      const res = await apis.postCoupon(id);
      console.log(res);
      dispatch(searchzzim(id,zzimval));
    }catch(e){
      console.log(e);
    }
  }
}

export const searchdelzzimFB = (id,zzimval) => {
  return async (dispatch) => {
    try{
      const res = await apis.delFolders(id);
      console.log(res);
      dispatch(searchzzim(id,zzimval));
    }catch(e){
      console.log(e);
    }
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
          draft.hasMore = action.payload?.main?.length===0? false : true
        }
        else{
          draft.hasMore = false
        }
        console.log(draft.pagingList)
        // hasMore가 false라면 빈 배열을, true면 list의 데이터가 포함된 배열을 반환한다.
        draft.pagingList = draft.hasMore===false?draft.pagingList : draft.pagingList.concat(action.payload.list)
      }),
    [GET_DCLIST]:(state,action) => 
      produce(state,(draft)=>{
        draft.rank = action.payload.rank;
      }),
    [SEARCH]:(state,action) =>
      produce(state,(draft)=>{
        draft.searchList = action.payload.search_list;
      }),
    [RANK_ZZIM]:(state,action) =>
      produce(state,(draft)=>{
        let idx = draft.rank.findIndex((p) => p.id === action.payload.coupon_id);
        if(action.payload.zzimval){
          draft.rank[idx].couponSelect = 0
        }else{
          draft.rank[idx].couponSelect = 1
        }
      }),
    [SEARCH_ZZIM]:(state,action) =>
      produce(state,(draft)=>{
        let idx = draft.searchList.findIndex((p) => p.id === action.payload.coupon_id);
        if(action.payload.zzimval){
          draft.searchList[idx].couponSelect = 0
        }else{
          draft.searchList[idx].couponSelect = 1
        }
    }),
  },
  initialState
);

const listCreators = {
  getListMW,
  getDcListMW,
  rankaddzzimFB,
  rankdelzzimFB,
  searchListFB,
  searchaddzzimFB,
  searchdelzzimFB,
  rankzzim,
  searchzzim
};

export { listCreators };
