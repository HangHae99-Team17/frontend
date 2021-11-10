import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

//action type
const SET_SALE = "SET_SALE";
const ADD_SALE = "ADD_SALE";
const DEL_SALE = "DEL_SALE";
const EDIT_SALE = "EDIT_SALE";

//action creator
const setSale = createAction(SET_SALE, (sale) => ({ sale }));
const addSale = createAction(ADD_SALE, (sale) => ({ sale }));
const delSale = createAction(DEL_SALE, (coupon_id) => ({coupon_id}));
const editSale = createAction(EDIT_SALE, (coupon_id,coupon_content)=>({coupon_id,coupon_content}));

//initialState
const initialState = {
  list: [],
};

export const setSaleFB = () => {
  return async(dispatch, getState, { history }) => {
    try {
      const res = await apis.getCoupon();
      dispatch(setSale(res.data.data))
    } catch(e) {
      console.log(e);
      history.push('/errpage');
    }
  }
}

export const addSaleFB = (sale) => {
  return async (dispatch, getState, { history }) => {
    try {
      const res = await apis.addCoupon(sale);
      console.log(res.data.data);
      dispatch(addSale(sale));
      history.replace("/");
    } catch(e) {
      console.log(e);
    }
  };
};

export const delSaleFB= (coupon_id) => {
  return async(dispatch,getState,{ history }) => {
    try{
      await apis.delCoupon(coupon_id);
      dispatch(delSale(coupon_id));
      history.goback();
    }catch(e){
      console.log(e);
    }
  }
}

export const editSaleFB = (coupon_id,coupon_content) => {
  return async(dispatch,{history}) => {
    try{
      await apis.editCoupon(coupon_id,coupon_content);
      dispatch(editSale(coupon_id,coupon_content));
    }catch(e){
      console.log(e);
    }
  }
}

export default handleActions(
  {
    [SET_SALE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.sale
      }),
    [ADD_SALE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.sale);
      }),
    [DEL_SALE]: (state, action) =>
      produce(state, (draft)=>{
        let idx = draft.list.findIndex((p) => p.id === action.payload.coupon_id);
        console.log(idx)
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
    [EDIT_SALE]:(state,action)=> 
      produce(state,(draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.coupon_id);
        draft.list[idx] = {...draft.list[idx],...action.payload.coupon_content}
      })
  },
  initialState
);


const actionCreators = {
  addSaleFB,
  setSaleFB,
  delSaleFB,
  editSaleFB
};

export { actionCreators };