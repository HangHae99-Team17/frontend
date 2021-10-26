import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { apis } from '../../common/axios';

const SET_POST = "SET_POST";


const setPost = createAction(SET_POST, (post_list) => ({post_list}))


const initialState = {
    list:[]
}

// middleware
const getPostMiddleware = () => {
    return (dispatch) => {
    apis
        .getPost()
        .then((res) => {
        

        })
        .catch((err) => {
        

        });
    };
};


export default handleActions(
    {
        [SET_POST]: (state, action) =>
        produce(state, (draft) => {
        
        }),
    },
    initialState
);

const actionCreators = {
    setPost,
    getPostMiddleware,

};

export { actionCreators };