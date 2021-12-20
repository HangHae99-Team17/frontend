import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.withoh.shop/",
});

instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  config.headers["X-Auth-Token"] = `${sessionStorage.getItem("token")}`;
  return config;
});

export const apis = {
   adduser: (user_info) => instance.post('/api/user/signup',user_info),
   loginuser: (user_info) => instance.post('/api/user/login',user_info),
   logincheck: () => instance.get('api/user/show'),
   edituser: (user_info) => instance.put('/api/user/change',user_info),
   deluser: (password) => instance.post('/api/user/delete',password),
   emailcheck: (userEmail) => instance.post('/api/user/redunancy',userEmail),
   postCoupon: (couponId)=>instance.post('api/folders/create',couponId),
   // 쿠폰 상세페이지 데이터 불러오기
   getDetail:(param)=>instance.get(`api/detail/${param}`),
   // 로그인 메인 페이지,카테고리 할인 정보 리스트 가지고오기
   getList: (param,page,size,sortBy,isAsc) => instance.get(`/api/main/${param}?page=${page}&size=${size}&sortBy=${sortBy}&isAsc=${isAsc}`),   
   // 메인페이지 정보리스트 불러오기
   getDcList: ()=>instance.get('api/main/rank'),
   // 보관함에 찜한 쿠폰 가지고 오기
   getFolders:() => instance.get('api/folders/read'), 
  //  보관함에서 찜한 쿠폰 삭제하기
   delFolders:(param) => instance.delete(`api/folders/delete/${param}`),
  //  오늘 마감인 쿠폰 보여주기
    todayDes:()=>instance.get('/todayCoupons'),
   // 관리자 페이지 api
   getCoupon:()=>instance.get('api/admin/main'),
   addCoupon:(coupon_content)=>instance.post('api/admin/coupon',coupon_content),
   delCoupon:(coupon_id)=>instance.delete(`/api/admin/coupon/${coupon_id}`),
   editCoupon:(coupon_id,coupon_content)=>instance.put(`api/admin/coupon/update/${coupon_id}`,coupon_content),
   useractive:()=>instance.put('api/user/reactivation'),
   searchCoupon:(search)=>instance.get(`/api/main/search/${search}`)
 };