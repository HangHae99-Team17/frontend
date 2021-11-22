import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';
const DEL_FOLDERS = 'DEL_FOLDERS';

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));
const delFolderss = createAction(DEL_FOLDERS, (coupon_id) => ({coupon_id}));

// initialState
const initialState = {
  list: [],
};

// 찜한목록 불러오기
const getFoldersMiddleware = () => {
  return async(dispatch) => {
    await apis.getFolders().then((res) => {
        const folders_list = res.data.coupons;
        dispatch(loadFolders(folders_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const delFoldersMiddleware= (coupon_id) => {
  return async(dispatch,getState,{history}) => {
    await apis.delFolders(coupon_id).then((res)=>{
      dispatch(delFolderss(coupon_id));
      history.replace('/salebox');
    }).catch((e)=>{
      console.log(e)
    })
  }
};

// 찜하기 기능 post 미들웨어_ 이거는 백에 보내주는 일이라 async안씀
export const addPostMW = (id,zzim)=>{
  return (dispatch, { history })=>{
    // id는 내가 보내줘야 하는 값(json형태로 넘겨야 하는 값)
    if(zzim){
      apis.delFolders(id)
      .then(()=>{
          
      })
      .catch((err)=>{
        console.error(err)
      });
    }else if(!zzim){
      apis.postCoupon(id)
      .then(()=>{
          
      })
      .catch((err)=>{
        console.error(err)
      });
    }
  };
}

// reducer
export default handleActions(
  {
    [LOAD_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
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
  getFoldersMiddleware,
  delFoldersMiddleware,
  addPostMW,
};

export { actionCreators };
