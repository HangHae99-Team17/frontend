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

//회원가입
export const signupFB = (user) => {
  return async (dispatch, getState, { history }) => {
    try {
      await apis.adduser(user);
      alert("회원가입에 성공하셨습니다.");
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };
};

//로그인
export const loginFB = (user) => {
  return async (dispatch, getState, {history}) => {
    try {
      const res = await apis.loginuser(user)
      if(res.data.data !== "유저네임을 찾을 수 없습니다." && res.data.data !== "비밀번호가 맞지 않습니다."){
        const token = res.data.data.token;
        if (token) {
          sessionStorage.setItem("token", `${token}`);
        }
        dispatch(setUser(res.data.data));
        history.push(`api/main/`);
      }else{
        window.alert(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// 로그인 여부 체크
export const loginCheckFB = () => {
  return async (dispatch) => {
      const res = await apis.logincheck();
      dispatch(setUser(res.data.data));
  };
};

//로그아웃
export const logoutFB = () => {
  return(dispatch,{ history }) => {
    sessionStorage.removeItem("token");
    dispatch(setUser(null));
    alert("로그아웃 되었습니다.");
    console.log(history);
    history.push("/");
  }
}

//회원정보 수정
export const edituserFB = (user_info) => {
  return async(dispatch, {history}) => {
    try{
      const res = await apis.edituser(user_info);
      if(res.data.data === "비밀번호가 맞지 않습니다."){
        window.alert("비밀번호가 맞지 않습니다.");
        history.replace('/mypage');
      }
      dispatch(setUser(res.data.data));
      window.alert("개인정보가 수정되었습니다");
      history.replace('/mypage');
    }catch(e){
      console.log(e);
    }
  }
}

//회원정보 삭제
export const deluserFB = (password) => {
  return async (dispatch, {history}) => {
    try {
      await apis.deluser(password);
      sessionStorage.removeItem("token");
      dispatch(setUser(null));
      history.replace("/");
    } catch (e) {
      console.log(e);
    }
  }
}



export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
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
  edituserFB,
  deluserFB
};

export { actionCreators };