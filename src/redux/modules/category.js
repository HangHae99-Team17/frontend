import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../common/axios';

// action 생성
const LOAD_CATEGORY = 'LOAD_CATEGORY';

// action creators
const loadCategory = createAction(LOAD_CATEGORY, (list) => ({ list }));

// initialState
const initialState = {
  list: [],
};

// middleware
const getCategoryMiddleware = () => {
  return (dispatch) => {
    apis.getCategory()
      .then((res) => {
        console.log(res.data.data)
        const category_list = res.data.data;
        dispatch(loadCategory(category_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};


// reducer
export default handleActions(
  {
    [LOAD_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      })
  },
  initialState
);

const categoryCreators = {
  getCategoryMiddleware,
};

export { categoryCreators };
