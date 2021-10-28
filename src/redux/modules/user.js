import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

//action type
const SET_USER = "SET_USER";
const CHECK_EMAIL = "CHECK_EMAIL";


//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
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
      if(res.data.data !== "유저네임을 찾을 수 없습니다." && res.data.data !== "비밀번호가 맞지 않습니다."){
        const token = res.data.data.token;
        const user_name = res.data.data.nickname;
        if (token) {
          sessionStorage.setItem("token", `${token}`);
          sessionStorage.setItem("nickname", `${user_name}`);
        }
        dispatch(setUser(res.data.data));
        history.push("/");
      }else{
        window.alert(res.data.data)
      }
    } catch (e) {
      console.log("error");
    }
  }
}

// 로그인 여부 체크
export const loginCheckFB = () => {
  return async (dispatch) => {
      const res = await apis.logincheck()
      console.log("deeee")
      dispatch(setUser(res.data.data));
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



export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        console.log(draft.user);
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
};

export { actionCreators };
