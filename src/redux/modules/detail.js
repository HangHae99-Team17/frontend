import { Dispatch } from "react-redux";
import { createAction, handleActions } from 'redux-actions';
import {apis} from '../../common/axios';
import { produce } from 'immer';



// 액션타입 생성
const GET_DETAIL = 'GET_DETAIL';
// 액션 생성함수
const getDetail = createAction(GET_DETAIL, (info) => ({info}));
// 초기화
const initialState = {
    info :[],
};
// 디테일 가지고 오는 미들웨어
const getDetailMW = (params)=>{
    return async (dispatch)=>{
        await apis 
        .getDetail(params)
        .then((res)=>{
            console.log(res.data.data)
            dispatch(getDetail(res.data))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
};
// 리듀서
export default handleActions(
    {
      [GET_DETAIL]: (state, action) =>
        produce(state, (draft) => {
          draft.info = action.payload.info;
        }),
    },
    initialState
  );

  const detailCreators = {
    getDetailMW
  };
  
  export { detailCreators };
  