import React from "react";
import styled from "styled-components";
import { skt, kt, lg } from "../image";

const TeleType = (props) => {
  const tels = [
    { tel_id: 0, tel_name: "SKT", tel_img: skt },
    { tel_id: 1, tel_name: "KT", tel_img: kt },
    { tel_id: 2, tel_name: "LG", tel_img: lg },
  ];

  if (props.mode === "signup") {
    return (
      <TeleTypeBox>
        {tels.map((tel) => {
          if (props.telecom === tel.tel_name) {
            return (
              <SignUpButton
                image={tel.tel_img}
                bg="orange"
                key={tel.tel_id}
                value={tel.tel_name}
                onClick={props.telecomtypeselect}
              >
                {tel.tel_name}
              </SignUpButton>
            );
          } else {
            return (
              <SignUpButton
                image={tel.tel_img}
                bg="grey"
                key={tel.tel_id}
                value={tel.tel_name}
                onClick={props.telecomtypeselect}
              >
                {tel.tel_name}
              </SignUpButton>
            );
          }
        })}
      </TeleTypeBox>
    );
  } else if (props.mode === "useredit") {
    return (
      <TeleTypeBox>
        {tels.map((tel) => {
          if (props.telecom === tel.tel_name) {
            return (
              <UserEditButton
              image={tel.tel_img}
                bg="orange"
                color="orange"
                key={tel.tel_id}
                value={tel.tel_name}
                onClick={props.telecomtypeselect}
              >
                {tel.tel_name}
              </UserEditButton>
            );
          } else {
            return (
              <UserEditButton
              image={tel.tel_img}
                bg="#E4E4E4"
                key={tel.tel_id}
                value={tel.tel_name}
                onClick={props.telecomtypeselect}
              >
                {tel.tel_name}
              </UserEditButton>
            );
          }
        })}
      </TeleTypeBox>
    );
  } else if (props.mode === "saleinfo") {
    return (
      <SaleinfoBox>
        {tels.map((tel) => {
          if (props.coupontype === tel.tel_name) {
            return (
              <SignUpButton
                bg="orange"
                image={tel.tel_img}
                color="orange"
                key={tel.tel_id}
                onClick={props.categoryselect}
                value={tel.tel_name}
              >
                {tel.tel_name}
              </SignUpButton>
            );
          } else {
            return (
              <SignUpButton
                image={tel.tel_img}
                bg="gray"
                key={tel.tel_id}
                onClick={props.categoryselect}
                value={tel.tel_name}
              >
                {tel.tel_name}
              </SignUpButton>
            );
          }
        })}
      </SaleinfoBox>
    );
  }
};

const UserEditButton = styled.button`
  height: 48px;
  width: 100px;
  border-radius: 4px;
  font-size:15px;
  background-color: white;
  color: ${(props) => props.color};
  border: solid 1px ${(props) => props.bg};
  margin-bottom: 10px;
  @media screen and (min-width: 1024px) {
      height:100px;
      background-image: url(${(props) => props.image});
      background-position: 50% 35%;
      background-repeat: no-repeat;
      line-height:140px;
  }
`;

const SignUpButton = styled.button`
  background-position: 33px 20px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.image});
  line-height: 140px;
  margin-bottom: 15px;
  border: none;
  width: 99px;
  height: 99px;
  border-radius: 5px;
  background-color: white;
  color: ${(props) => props.bg};
  border: solid 1px ${(props) => props.bg};
`;

const SaleinfoBox = styled.div`
  display: flex;
  margin: 0 auto;
  width: 375px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 0px;
  @media screen and (min-width: 1024px) {
    display: flex;
    margin: 0 auto;
    width: 370px;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding-right: 335px;
  }
`;

const TeleTypeBox = styled.div`
  display: flex;
  width: 375px;
  flex-wrap: wrap;
  font-size: 15px;
  justify-content: space-evenly;
  padding-left: 0px;
  @media screen and (min-width: 1024px) {
    margin-left: 10px;
    font-weight: bold;
    line-height: 145px;
  }
`;

export default TeleType;
