import axios from 'axios';

const USER_TOKEN = localStorage.getItem("token");

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://localhost:4000/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
    authorization: `Bearer ${localStorage.getItem("token")}`
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${USER_TOKEN}`;
    return config;
  },
  function (error) {
    console.log("err");
    return Promise.reject(error);
  }
);

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
  getPost: () => instance.get('/api/posts'),

};