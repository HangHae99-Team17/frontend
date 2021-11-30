import React from "react";
import styled from "styled-components";
import {
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

const InterType = (props) => {
  const interests = [
    { inter_id: 0, inter_type: "카페,디저트", inter_img: cup },
    { inter_id: 1, inter_type: "음식점", inter_img: knive_fork },
    { inter_id: 2, inter_type: "패스트푸드", inter_img: hamburger },
    { inter_id: 3, inter_type: "편의점,마트", inter_img: cart },
    { inter_id: 4, inter_type: "뷰티,미용", inter_img: scissors },
    { inter_id: 5, inter_type: "패션", inter_img: t_shirt },
    { inter_id: 6, inter_type: "건강,스포츠", inter_img: bicycle },
    { inter_id: 7, inter_type: "여행,숙박", inter_img: airplane },
    { inter_id: 8, inter_type: "문화", inter_img: film_frame },
    { inter_id: 9, inter_type: "가전,디지털", inter_img: monitor2 },
    { inter_id: 10, inter_type: "가구", inter_img: house },
    { inter_id: 11, inter_type: "생활", inter_img: gift },
  ];

  if (props.mode === "signup") {
    return (
      <React.Fragment>
        <InterTypeBox>
          {interests.map((interest) => {
            if (
              props.type1 !== interest.inter_type &&
              props.type2 !== interest.inter_type &&
              props.type3 !== interest.inter_type
            ) {
              return (
                <SignUpButton
                  image={interest.inter_img}
                  bg="grey"
                  key={interest.inter_id}
                  onClick={props.typeselect}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </SignUpButton>
              );
            } else {
              return (
                <SignUpButton
                  image={interest.inter_img}
                  bg="orange"
                  key={interest.inter_id}
                  onClick={props.typecancle}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </SignUpButton>
              );
            }
          })}
        </InterTypeBox>
      </React.Fragment>
    );
  } else if (props.mode === "useredit") {
    return (
      <React.Fragment>
        <InterTypeBox>
          {interests.map((interest) => {
            if (
              props.type1 !== interest.inter_type &&
              props.type2 !== interest.inter_type &&
              props.type3 !== interest.inter_type
            ) {
              return (
                <UserEditButton
                image={interest.inter_img}
                  bg="#E4E4E4"
                  onClick={props.typeselect}
                  key={interest.inter_id}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </UserEditButton>
              );
            } else {
              return (
                <UserEditButton
                image={interest.inter_img}
                  bg="orange"
                  color="orange"
                  onClick={props.typecancle}
                  key={interest.inter_id}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </UserEditButton>
              );
            }
          })}
        </InterTypeBox>
      </React.Fragment>
    );
  } else if (props.mode === "saleinfo") {
    return (
      <React.Fragment>
        <SaleinfoBox>
          {interests.map((interest) => {
            if (props.coupontype !== interest.inter_type) {
              return (
                <SignUpButton
                  image={interest.inter_img}
                  bg="grey"
                  key={interest.inter_id}
                  onClick={props.categoryselect}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </SignUpButton>
              );
            } else {
              return (
                <SignUpButton
                  bg="orange"
                  color="orange"
                  key={interest.inter_id}
                  onClick={props.categoryselect}
                  image={interest.inter_img}
                  value={interest.inter_type}
                >
                  {interest.inter_type}
                </SignUpButton>
              );
            }
          })}
        </SaleinfoBox>
      </React.Fragment>
    );
  }
};

const UserEditButton = styled.button`
  height: 48px;
  width: 100px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  font-size:15px;
  color: ${(props) => props.color};
  border: solid 1px ${(props) => props.bg};
  cursor:pointer;
  @media screen and (min-width: 1024px) {
      height:100px;
      background-image: url(${(props) => props.image});
      background-position: 50% 35%;
      background-repeat: no-repeat;
      line-height:140px;
  }
`;

const InterTypeBox = styled.div`
  display: flex;
  margin: 0 auto;
  width: 375px;
  flex-wrap: wrap;
font-size:16px;
cursor:pointer;
  justify-content: space-evenly;
`;

const SaleinfoBox = styled.div`
  display: flex;
  margin: 0 auto;
  width: 375px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 0px;
  cursor:pointer;
  @media screen and (min-width: 1024px) {
    display: flex;
    margin: 0 auto;
    width: 700px;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding-left: 0px;
  }
`;
const SignUpButton = styled.button`
  background-position: 33px 20px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  margin-bottom: 15px;
  border: none;
  width: 99px;
  height: 99px;
  font-size: 15px;
  border-radius: 5px;
  background-color: white;
  cursor:pointer;
  color: ${(props) => props.bg};
  border: solid 1px ${(props) => props.bg};
  line-height: 140px;

  @media screen and (min-width: 1024px) {
    margin-left: 10px;
    font-weight: bold;
    line-height: 145px;
  }
`;

export default InterType;
