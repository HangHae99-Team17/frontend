import axios from 'axios';

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://3.34.199.152/',
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

};