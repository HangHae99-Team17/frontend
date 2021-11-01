import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.12.105:8080/",
});

instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["X-Auth-Token"] = `${sessionStorage.getItem("token")}`;
  return config;
});


export const apis = {
  // 할인 정보 리스트 가지고 오기
  getList: () => instance.get('/api/main'),
  adduser: (user_info) => instance.post('/api/user/signup',user_info),
  loginuser: (user_info) => instance.post('/api/user/login',user_info),
  logincheck: () => instance.get('api/user/show'),
  edituser: (user_info) => instance.put('/api/user/change',user_info),
  deluser: (password) => instance.post('/api/user/delete',password),
  getCategory:(param) => instance.get(`api/category/${param}`),
  getFolders:() => instance.get('api/folders'),
  
  // 쿠폰 상세페이지 데이터 불러오기
  getDetail:(param)=>instance.get(`api/detail/${param}`),
};

  

