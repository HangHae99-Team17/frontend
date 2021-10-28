import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';
const ADD_FOLDERS = 'ADD_FOLDERS';

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));
const AddFolders = createAction(ADD_FOLDERS, (post) => ({ post }));

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

const addFoldersMiddleware = (post) => {
  return (dispatch) => {
    apis.createFolders(post)
      .then(() => {
        dispatch(AddFolders(post));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOAD_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [ADD_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
      }),
  },
  initialState
);

const foldersCreators = {
  getFoldersMiddleware,
  addFoldersMiddleware,
};

export { foldersCreators };
