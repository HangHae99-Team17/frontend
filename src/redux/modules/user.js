import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

//action type
const SET_USER = "SET_USER";
const CHECK_EMAIL = "CHECK_EMAIL";
const LOGIN_ERROR = "LOGIN_ERROR";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const useremail = createAction(CHECK_EMAIL, (checkresult) => ({checkresult}));
const loginerror = createAction(LOGIN_ERROR, (error) => ({error}));

//initialState
const initialState = {
  user: null,
  loginError:null,
  is_login: false,
  email_check: null
};

//이메일 중복체크
export const emailCheckFB = (userEmail) =>{
  return async (dispatch, getState, { history }) => {
    try{
      const res = await apis.emailcheck(userEmail);
      dispatch(useremail(res.data.result));
    }catch(e){
      console.log(e)
    }
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
  return async (dispatch, getState, { history }) => {
    try {
      const res = await apis.loginuser(user);
      if(res.data.data !== "유저네임을 찾을 수 없습니다." && res.data.data !== "비밀번호가 맞지 않습니다."){
        const token = res.data.data.token;
        if (token) {
          sessionStorage.setItem("token", `${token}`);
        }
      if(res.data.data.status === true){
          dispatch(setUser(res.data.data));
      // 쿠폰 마감일 알람 
      if(res.data.data.alertCoupon > 0){
        const alert = window.confirm("곧 마감되는 쿠폰이 있어요! 확인 하시겠습니까?")
        console.log(res.data.data.alertCoupon)
       if(alert){
        history.push('/couponfolder')
       }
       else {  history.push('/loginmain');  }
      }
      else { history.push('/loginmain') }
        }

      else{
          dispatch(setUser(res.data.data));
          history.push('/useractive');
        }
      }else{
        dispatch(loginerror(res.data.data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// 로그인 여부 체크
export const loginCheckFB = () => {
  return async (dispatch) => {
    try{
      const res = await apis.logincheck();
      dispatch(setUser(res.data.data));
    }catch(e){
      console.log(e);
    }
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
    try{
      const res =await apis.edituser(user_info);
      if(res.data.data === "비밀번호가 맞지 않습니다."){
        window.alert("비밀번호가 맞지 않습니다.");
        history.push('/edituser');
      }else{
        dispatch(setUser(res.data.data));
        window.alert("개인정보가 수정되었습니다");
        history.push('/');
      }
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

export const useractiveFB = (yn) => {
  return async (dispatch, getState, { history }) => {
    try{
      if(yn === "yes"){
        const res = await apis.useractive();
        console.log(res);
        history.push('/');
      }else{
        sessionStorage.removeItem("token");
        dispatch(setUser(null));
        history.push('/');
      }
    }catch(e){
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
        draft.email_check = action.payload.checkresult
      }),
    [LOGIN_ERROR]: (state, action) => 
      produce(state, (draft) => {
        draft.loginError = action.payload.error
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