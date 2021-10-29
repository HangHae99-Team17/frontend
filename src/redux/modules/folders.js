import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios'

// action 생성
const LOAD_FOLDERS = 'LOAD_FOLDERS';

// action creators
const loadFolders = createAction(LOAD_FOLDERS, (list) => ({ list }));

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

// reducer
export default handleActions(
  {
    [LOAD_FOLDERS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      })
  },
  initialState
);

const foldersCreators = {
  getFoldersMiddleware,
};

export { foldersCreators };
