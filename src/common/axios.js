import axios from 'axios';

const USER_TOKEN = localStorage.getItem("token");

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://13.209.12.105:8080/',
});

instance.interceptors.request.use((config) => {
	config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["X-Auth-Token"] = `${sessionStorage.getItem("token")}`;
  return config;
});

export const apis = {

  login: (id, pw) =>
  instance.post("/api/users/login", {
    loginId: id,
    userPw: pw,
  }),
signup: (id, pw, name, nick) =>
  instance.post("/api/users/register", {
    userId: id,
    userPw: pw,
    userName: name,
    userNameId: nick,
  }),



  // 게시물 불러오기
  adduser: (user_info) => instance.post('/api/user/signup',user_info),
  loginuser: (user_info) => instance.post('/api/user/login',user_info),
  emailconfirm: (user_email) => instance.post('/api/user/redunancy',user_email)
};