import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const DEL_FOLDERS = 'DEL_FOLDERS';

// action creators
const delFolderss = createAction(DEL_FOLDERS, (coupon_id) => ({coupon_id}));

// initialState
const initialState = {
  list: [],
};


export const delFoldersMiddleware = (coupon_id) => {
  return async (dispatch, getState, { history }) => {
    try{
      const res = await apis.delFolders(coupon_id);
      console.log(res)
      dispatch(delFolderss(coupon_id));
      history.push('/salebox');
    }catch(e){
      console.log(e);
    }
  }
};

// reducer
export default handleActions(
  {
    [DEL_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.coupon_id);
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const actionCreators = {
  delFoldersMiddleware,
};

export { actionCreators };
