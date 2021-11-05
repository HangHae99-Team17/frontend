// 리스트를 가지고 오는 리덕스
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const GET_LIST = 'GET_LIST';
const GET_DCLIST = 'GET_DCLIST'

// 액션 생성 함수
const getList = createAction(GET_LIST, (list) => ({ list }));
const getDcList = createAction(GET_DCLIST, (rank)=>({rank}))

// 초기값 설정
const initialState = {
  list: [],
  rank: [],
};

// 리스트 가지고 오는 미들웨어_백에서 받아올땐 시간이 걸려
const  getListMW = (params) => {
  return  async (dispatch,getState,{history}) => {
    await apis 
      .getList(params)
      .then((res) => {
        console.log(res.data);
        dispatch(getList(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// 로그인 전 메인페이지 랭킹 리스트 가져오는 미들웨어
const getDcListMW = ()=>{
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
        draft.list = action.payload.list;
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
