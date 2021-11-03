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
  // 메인 페이지 할인 정보 리스트 가지고 오기
  // 여기서 사용되는 param은 type이 됩니다.(request)
  getList: (param) => instance.get(`/api/main/${param}`),
  // 게시물 불러오기
  adduser: (user_info) => instance.post('/api/user/signup',user_info),
  loginuser: (user_info) => instance.post('/api/user/login',user_info),
  logincheck: () => instance.get('api/user/show'),
  edituser: (user_info) => instance.put('/api/user/change',user_info),
  deluser: (password) => instance.post('/api/user/delete',password),
  getCategory:(param) => instance.get(`api/category/${param}`),
  getFolders:() => instance.get('api/folders'),
  delFolders:(couponId) => instance.post(`api/folders/${couponId}`,couponId),
  // 쿠폰 상세페이지 데이터 불러오기
  getDetail:(param)=>instance.get(`api/detail/${param}`),
  // 찜하기 기능(폴더에 포스트), couponId가 request값 ->json값으로 보내줘야 함
  postCoupon: (couponId)=>instance.post('/api/folders',couponId),
  // 관리자 페이지 api
  getCoupon:()=>instance.get('api/admin/main'),
  addCoupon:(coupon_content)=>instance.post('api/admin/coupon',coupon_content),
  delCoupon:(coupon_id)=>instance.delete(`/api/admin/coupon/${coupon_id}`),
  editCoupon:(coupon_id,coupon_content)=>instance.put(`api/admin/coupon/update/${coupon_id}`,coupon_content)
};

