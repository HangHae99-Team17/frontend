import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import {
  skt,
  kt,
  lg,
  shinhan,
  hyundai,
  samsung,
  kb,
  lotte,
  woori,
  nh,
  bc,
  toss,
  kakao,
  hana,
  citi,
  cup,
  airplane,
  bicycle,
  cart,
  film_frame,
  gift,
  hamburger,
  house,
  knive_fork,
  monitor2,
  scissors,
  t_shirt,
} from "../image";

const Category = () => {
  const tel_category = [
    { title: "skt", img: <img src={skt} /> },
    { title: "kt", img: <img src={kt} /> },
    { title: "lg", img: <img src={lg} /> },
  ];

  const card_category = [
    { title: "신한카드", img: <img src={shinhan} /> },
    { title: "현대카드", img: <img src={hyundai} /> },
    { title: "삼성카드", img: <img src={samsung} /> },
    { title: "국민카드", img: <img src={kb} /> },
    { title: "롯데카드", img: <img src={lotte} /> },
    { title: "하나카드", img: <img src={hana} /> },
    { title: "우리카드", img: <img src={woori} /> },
    { title: "농협카드", img: <img src={nh} /> },
    { title: "씨티카드", img: <img src={citi} /> },
    { title: "BC카드", img: <img src={bc} /> },
    { title: "토스카드", img: <img src={toss} /> },
    { title: "카카오카드", img: <img src={kakao} /> },
  ];

  const inter_category = [
    { title: "카페,디저트", img: <img src={cup} /> },
    { title: "음식점", img: <img src={knive_fork} /> },
    { title: "패스트푸드", img: <img src={hamburger} /> },
    { title: "편의점,마트", img: <img src={cart} /> },
    { title: "뷰티,미용", img: <img src={scissors} /> },
    { title: "패션", img: <img src={t_shirt} /> },
    { title: "건강,스포츠", img: <img src={bicycle} /> },
    { title: "여행,숙박", img: <img src={airplane} /> },
    { title: "문화", img: <img src={film_frame} /> },
    { title: "가전,디지털", img: <img src={monitor2} /> },
    { title: "가구", img: <img src={house} /> },
    { title: "생활", img: <img src={gift} /> },
  ];
  return (
    <Div>
    <Litext>관심사 할인</Litext>
      <Ul>
        {inter_category.map((item) => {
          return (
            <Li
              key={item.id}
              onClick={() => {
                history.push(`/api/categorydetail/${item.title}`);
                history.go(0);
              }}
            >
              <BOX>
                {" "}
                <BoxImg>{item.img}</BoxImg>
                {item.title}
              </BOX>{" "}
            </Li>
          );
        })}
      </Ul>
        <Litext>카드사 혜택</Litext>
      <Ul>
        {card_category.map((item) => {
          return (
            <Li
              onClick={() => {
                history.push(`/api/categorydetail/${item.title}`);
                history.go(0);
              }}
            >
              <BOX>
                {" "}
                <BoxImg>{item.img}</BoxImg>
                {item.title}
              </BOX>{" "}
            </Li>
          );
        })}
      </Ul>
      <TelBox>
        <Litext>통신사 혜택</Litext>
        {tel_category.map((item) => {
          return (
            <Li
              onClick={() => {
                history.push(`/api/categorydetail/${item.title}`);
                history.go(0);
              }}
            >
              <BOX>
                {" "}
                <BoxImg>{item.img}</BoxImg>
                {item.title}
              </BOX>{" "}
            </Li>
          );
        })}
        </TelBox>
    </Div>
  );
};

const Div = styled.div`
  height: 100vh;
  margin: 0 auto;
  @media screen and (min-width: 1024px) {
    width: 750px;
    display: flex;
    flex-flow:row wrap;
  }
`;

const Litext = styled.div`
  font-size: 18px;
  margin: 0 auto;
  width: 355px;
  font-weight: bold;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 5px;
  line-height: 30px;
  @media screen and (min-width: 1024px) {
    width: 750px;
    line-height: 0px;
    padding:40px 0 0 15px;
  }
`;

const Ul = styled.ul`
  display: flex;
  margin: 0 auto;
  width: 375px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 0px;
  @media screen and (min-width: 1024px) {
    width: 1000px;
  }
`;
const TelBox = styled.ul`
  display: flex;
  margin: 0 auto;
  width: 375px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 0px;
  @media screen and (min-width: 1024px) {
    margin-left:0px;
  }
`;
const Li = styled.li`
  list-style: none;
  background-color: white;
  border: 1.5px solid #f09643;
  margin: 10px;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  color: #f09643;
  font-size: 15px;
`;
const BOX = styled.div`
  color: black;
  padding-top: 22px;
  line-height: 25px;
`;
const BoxImg = styled.div`
  height: 38px;
`;

export default Category;
