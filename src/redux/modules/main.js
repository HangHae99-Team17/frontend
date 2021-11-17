// 리스트를 가지고 오는 리덕스
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const GET_LIST = 'GET_LIST';
const GET_DCLIST = 'GET_DCLIST';
const ADD_ZZIM = 'ADD_ZZIM';

// 액션 생성 함수
const getList = createAction(GET_LIST, (list) => ({list}));
const getDcList = createAction(GET_DCLIST, (rank)=>({rank}))
const addZzim = createAction(ADD_ZZIM,(coupon_id,zzim)=>({coupon_id,zzim}))

// 초기값 설정
const initialState = {
  list: [],
  rank: [],
  // 무한스크롤 초기값 설정
  hasMore : true,
  loading : true,
  pagingList : []
};

// 리스트 가지고 오는 미들웨어_백에서 받아올땐 시간이 걸리기 때문에 async사용
const  getListMW = (type,page,size,sortBy,isAsc) => {
  return  async (dispatch) => {
   const response = await apis.getList(type,page,size,sortBy,isAsc)
      if(response){
        console.log(response.data.data);
        dispatch(getList(response.data.data));
      }
      else{
        console.error(response.error);
      }
  };
};

// 로그인 전 메인페이지 랭킹 리스트 가져오는 미들웨어 
export const getDcListMW = ()=>{
  return async (dispatch)=>{
    await apis
    .getDcList()
    .then((res)=>{
      dispatch(getDcList(res.data));
    })
    .catch((err)=>{
      console.error(err)
    });
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
          draft.hasMore = action.payload?.main?.length!==0? true : false
        }
        else{
          draft.hasMore = false
        }
        console.log(draft.pagingList)
        // hasMore가 false라면 빈 배열을, true면 list의 데이터가 포함된 배열을 반환한다.
        draft.pagingList = draft.hasMore!==true?draft.pagingList : draft.pagingList.concat(action.payload.list)
      }),
    [GET_DCLIST]:(state,action) => 
      produce(state,(draft)=>{
        draft.rank = action.payload.rank;
      }),
    [ADD_ZZIM]:(state,action) => 
      produce(state,(draft)=>{
        let idx = draft.rank.data.findIndex((p) => p.id === action.payload.coupon_id);
        if(action.payload.zzim){
          draft.rank.data[idx].couponSelect = 0
        }else{
          draft.rank.data[idx].couponSelect = 1
        }
      })
  },
  initialState
);

const listCreators = {
  getListMW,
  getDcListMW,
  addZzim
};

export { listCreators };
