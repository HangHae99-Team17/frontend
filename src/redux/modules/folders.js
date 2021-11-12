import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';
const DEL_FOLDERS = 'DEL_FOLDERS';

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));

const delFolders = createAction(DEL_FOLDERS, (coupon_id) => ({coupon_id}));



// initialState
const initialState = {
  list: [],
};

// middleware
const getFoldersMiddleware = () => {
  return (dispatch) => {
    apis.getFolders()
      .then((res) => {
        const folders_list = res.data;
        console.log(folders_list)
        dispatch(loadFolders(folders_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};


export const delFoldersMiddleware= (coupon_id) => {
  return async(dispatch,getState,{history}) => {
    try{
      await apis.delFolders(coupon_id);
      dispatch(delFolders(coupon_id));
      history.replace('/folders');
    }catch(e){
      console.log(e);
    }
  }
};

// 찜하기 기능 post 미들웨어_ 이거는 백에 보내주는 일이라 async안씀
const addPostMW = (id)=>{
  return (dispatch, { history })=>{
    // id는 내가 보내줘야 하는 값(json형태로 넘겨야 하는 값)
    apis.postCoupon(id)
    .then(()=>{
      console.log("성공")
    })
    .catch((err)=>{
      console.error(err)
    });
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
        console.log(idx)
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
      // 폴더의 get요청 리스트에 post할 걸 밀어넣는과정
    
  },
  initialState
);

const foldersCreators = {
  getFoldersMiddleware,
  delFoldersMiddleware,
  addPostMW,
};

export { foldersCreators };
