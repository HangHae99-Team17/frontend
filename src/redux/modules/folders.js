import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';
const POST_COUPON = 'POST_COUPON'

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));
const postCoupon = createAction(POST_COUPON, (id)=>({id}))

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
        dispatch(loadFolders(folders_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// 찜하기 기능 post 미들웨어_ 이거는 백에 보내주는 일이라 async안씀
const addPostMW = (id)=>{
  return (dispatch)=>{
    // id는 내가 보내줘야 하는 값(json형태로 넘겨야 하는 값)
    apis
    .postCoupon(id)
    .then(()=>{
      dispatch(postCoupon(id))
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
      // 폴더의 get요청 리스트에 post할 걸 밀어넣는과정
    [POST_COUPON]: (state,action) => 
    produce(state,(draft)=>{
      draft.list.push(action.payload.id)
    })
  },
  initialState
);

const foldersCreators = {
  getFoldersMiddleware,
  addPostMW,
};

export { foldersCreators };
