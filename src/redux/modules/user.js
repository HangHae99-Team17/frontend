import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

//action type
const SET_USER = "SET_USER";
const CHECK_EMAIL = "CHECK_EMAIL";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const checkemail = createAction(CHECK_EMAIL, (check_info) => ({check_info}))

//initialState
const initialState = {
  user: null,
  is_login: false,
  useremail: "",
};

export const signupFB = (user) => {
  return async (dispatch, getState, { history }) => {
    console.log(user)
    try {
      await apis.adduser(user)
      alert("회원가입에 성공하셨습니다.");
      history.push("/login");
    } catch (e) {
      console.log("error");
    }
  };
};

export const loginFB = (user) => {
  return async (dispatch, getState, {history}) => {
    try {
      const res = await apis.loginuser(user)
      console.log(res.data.data)
      const token = res.data.data.token;
      const user_name = res.data.data.nickname;

      if (token) {
        sessionStorage.setItem("token", `${token}`);
        sessionStorage.setItem("nickname", `${user_name}`);
      }

      dispatch(setUser(res.data.data));
      history.push("/");
    } catch (e) {
      console.log("error");
    }
  }
}

// 로그인 여부 체크
export const loginCheckFB = () => {
  return (dispatch) => {
    const nickname = sessionStorage.getItem("nickname");
    dispatch(setUser(nickname));
  };
};

export const logoutFB = () => {
  return(dispatch) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nickname");
    dispatch(setUser(null));
    alert("로그아웃 되었습니다.");
  }
}

export const checkemailFB = (user_email) => {
  return async (dispatch) => {
    try {
      const res = await apis.emailconfirm(user_email)
      
    } catch (e) {
      console.log("error");
    }
  }
}



export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        console.log(draft.user)
        draft.is_login = action.payload.user !== null ? true : false;
      }),
    [CHECK_EMAIL]: (state, action) => 
      produce(state, (draft) => {
        draft.useremail = action.payload.check_info
      })
  },
  initialState
);


const actionCreators = {
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
  checkemailFB
};

export { actionCreators };
