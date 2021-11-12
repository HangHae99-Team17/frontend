// 리스트를 가지고 오는 리덕스
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const GET_LIST = 'GET_LIST';
const GET_DCLIST = 'GET_DCLIST'

// 액션 생성 함수
const getList = createAction(GET_LIST, (list) => ({list}));
const getDcList = createAction(GET_DCLIST, (rank)=>({rank}))

// 초기값 설정
const initialState = {
  list: [],
  rank: [],
  // 무한스크롤 초기값 설정
  hasMore : true,
  loading : true,
  pagingList : []
};

// 리스트 가지고 오는 미들웨어_백에서 받아올땐 시간이 걸려
// params는 type을 넘겨 줄 거
export const getListMW = (params) => {
  return  async (dispatch) => {
   const response = await apis.getList(params)
      if(response){
        console.log(response.data);
        dispatch(getList(response.data));
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
      console.log("랭킹",res.data)
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
          // 데이터의 길이가 0이 아니라면 true를, 0이라면 false를 반환
          // 다음 페이지가 있는지 확인하고 데이터를 데리고 오겠다는 뜻
          draft.hasMore = action.payload?.main?.length!==0? true : false
        }
        else{
          draft.hasMore = false
        }
        console.log(draft.pagingList)
        // hasMore가 true가 아니면 빈 배열을, true면 list의 데이터가 포함된 배열을 반환한다.
        draft.pagingList = draft.hasMore!==true?draft.pagingList : draft.pagingList.concat(action.payload.list)
      }),

    [GET_DCLIST]:(state,action) => 
    produce(state,(draft=>{
      draft.rank = action.payload.rank;
    }))
  },
  initialState
);

const listCreators = {
  getListMW,
  getDcListMW
};

export { listCreators };
