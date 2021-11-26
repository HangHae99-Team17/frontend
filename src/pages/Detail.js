import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { detailCreators } from "../redux/modules/detail";
import styled from "styled-components";
import { listCreators } from "../redux/modules/main";
import { history } from "../redux/configureStore";
import { bookmark,fullBookmark } from "../image";

const Detail = (props) => {
  console.log(props.mode)
  const Id = props.match.params.id;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(detailCreators.getDetailMW(Id));
  }, []);

  const detail_list = useSelector((state) => state.detail.info.data);
  const is_login = useSelector((state) => state.user.is_login);
  const [zzim,setZzim] = useState(props.couponSelect===1?true:false);


  const zzimz = () => {
    if(is_login===false){
        alert("로그인이 필요한 서비스 입니다!");
        history.push('/login')
    }      
    
    if(zzim === false){
        if(props.mode === "rank"){
            dispatch(listCreators.rankaddzzimFB(props.id,zzim));
        }else if(props.mode === "search"){
            dispatch(listCreators.searchaddzzimFB(props.id,zzim));
        }
        setZzim(true);
    }else if(zzim === true){
        if(props.mode === "rank"){
            dispatch(listCreators.rankdelzzimFB(props.id,zzim));
        }else if(props.mode === "search"){
            dispatch(listCreators.searchdelzzimFB(props.id,zzim));
        }
        setZzim(false);
    }  
};

  return (
    <Wrap>
      <Image>
        <Image2 src={detail_list?.couponImage}></Image2>
      </Image>
      <TextBox>
        <Info>
          <div>
            <Title>
              {detail_list?.couponTitle}
              <br />
              {detail_list?.couponSubTitle} 할인 받기
            </Title>
            <Span>
              {detail_list?.couponCreate}~{detail_list?.couponDespire}
            </Span>
            <Div>{detail_list?.couponType} 카테고리</Div>
          </div>
        </Info>
        <LikeWrap>
          <TakeCoupon>
            <A href={detail_list?.couponUrl}> 할인 사용처 바로가기 </A>
          </TakeCoupon>
          <PickCoupon onClick={zzimz}>
            {is_login?(
            <Bookmarker src={bookmark} />):
            (<Bookmarker src={!zzim?bookmark:fullBookmark} onClick={zzimz}/>)
            }
            <Like>{detail_list?.couponLike}</Like>
          </PickCoupon>
        </LikeWrap>
        <P>상세설명</P>
        <Desc>{detail_list?.couponDesc}</Desc>
      </TextBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  margin: 0px auto;
  width: 375px;
  @media screen and (min-width: 1028px) {
    width: 740px;
    margin: 80px 0 0 1000px;
    transform: scale(1.4);
    top:100px;
  }
`;
const Image = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  text-align: center;
  margin: 00px auto;
  overflow:hidden;
  @media screen and (min-width: 1028px) {
    position: absolute;
    right: 600px;
  }
`;
const Image2 = styled.img`
  width: 375px;
  height : 270px;
`;
const LikeWrap = styled.div`
  display: flex;
  width: 355px;
  height: 50px;
  margin: 160px 0 0 16px;
`;
const TakeCoupon = styled.div`
  width: 264px;
  height: 48px;
  line-height: 48px;
  border: 1px solid #f09643;
  background-color: #f09643;
  margin-top: 10px;
  display: flex;
  border-radius: 4px;
`;
const A = styled.a`
  width : 264px;
  height :48px;
  text-decoration: none;
  font-size: 16px;
  color: white;
  font-weight: bold;
  padding-left: 60px;
`;
const PickCoupon = styled.div`
  width: 48px;
  height: 48px;
  margin-top: 10px;
  border: 1px solid #d6d6d7;
  border-radius: 4px;
  background-color: #fff;
  margin-left: 20px;
  position : relative;
`;
const P = styled.p`
  margin: 30px 23px;
  font-size: 18px;
  font-weight: 600;
`;
const Like = styled.div`
  display: inline-block;
  height: 10px;
  color: #f09643;
  font-weight: 600;
  position: absolute;
  bottom : 10px;
  left : 19px;
`;
const Bookmarker = styled.img`
margin :8px 0 0 16px;
`;
const Div = styled.div`
  margin: 0 0 0 26px;
  font-size: 14px;
  line-height: 30px;
  width: 330px;
`;
const Span = styled.div`
  margin: 20px 26px;
  font-size: 17px;
  font-weight: bold;
  color: #ff8f00;
`;
const Title = styled.div`
  font-size: 23px;
  font-weight: bold;
  margin-left: 26px;
  line-height: 38px;
`;
const Info = styled.div`
  display: flex;
  width: 375px;
  height: 50px;
  position: relative;
`;
const Desc = styled.div`
  margin: 0 0 0 26px;
  font-size: 14px;
  line-height: 30px;
  width: 330px;
  @media screen and (min-width:1028px){
position:absolute;
right:10px;
top:120px;
}
`;
const TextBox = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
`;

export default Detail;
