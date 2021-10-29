import axios from 'axios';
const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  // 우진님 서버 주소 http://3.34.199.152/
  baseURL: 'http://13.209.12.105:8080/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
    authorization: `Bearer ${localStorage.getItem("token")}`
  },
});

instance.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`;
	return config;
});

export const apis = {
  // 할인 정보 리스트 가지고 오기
  getList: () => instance.get('/api/main'),
  
  // 게시물 불러오기
  adduser: (user_info) => instance.post('/api/user/signup',user_info),
  loginuser: (user_info) => instance.post('/api/user/login',user_info),
  logincheck: () => instance.get('api/user/show'),
  edituser: (user_info) => instance.put('api/user/change',user_info),
  deluser: (password) => instance.delete('/api/user/delete',password),

  // 쿠폰 상세페이지 데이터 불러오기
  getDetail:(param)=>instance.get(`api/detail/${param}`),


};
