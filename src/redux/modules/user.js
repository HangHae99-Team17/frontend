import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";
import { listCreators } from './main';

//action type
const SET_USER = "SET_USER";
const CHECK_EMAIL = "CHECK_EMAIL";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const useremail = createAction(CHECK_EMAIL, (checkresult) => ({checkresult}));

//initialState
const initialState = {
  user: null,
  is_login: false,
  email_check: null
};

//이메일 중복체크
export const emailCheckFB = (userEmail) =>{
  return async (dispatch, getState, { history }) => {
    await apis.emailcheck(userEmail).then((res)=>{
      dispatch(useremail(res.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  }
}

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
        if(res.data.data.status === true){
          dispatch(setUser(res.data.data));
          history.push(`/useractive`);
        }else{
          dispatch(setUser(res.data.data));
          history.push(`/loginmain`);
        }
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
  return(dispatch, getState, { history }) => {
    sessionStorage.removeItem("token");
    dispatch(setUser(null));
  }
}

//회원정보 수정
export const edituserFB = (user_info) => {
  return async(dispatch, getState, { history }) => {
      await apis.edituser(user_info).then((res)=>{
        if(res.data.data === "비밀번호가 맞지 않습니다."){
          window.alert("비밀번호가 맞지 않습니다.");
          history.push('/edituser');
        }else{
        dispatch(setUser(res.data.data));
        window.alert("개인정보가 수정되었습니다");
        history.push('/');
      }}).catch((e)=>{
        console.log(e);
      })
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

export const useractiveFB = (yn) => {
  return async (dispatch, getState, { history }) => {
    if(yn === "yes"){
      await apis.useractive().then((res)=>{
        history.push('/');
      }).catch((e)=>{
        console.log(e);
      })
    }else{  
      sessionStorage.removeItem("token");
      dispatch(setUser(null));
      history.replace("/");
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
        draft.email_check = action.payload.checkresult
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
  deluserFB,
  emailCheckFB,
  useractiveFB
};

export { actionCreators };