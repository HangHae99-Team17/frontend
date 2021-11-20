import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as saleActions } from "../redux/modules/sale";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Button from "../elements/Button";

const Coupon = (props) => {
  const dispatch = useDispatch();
  console.log("salelist_props", props);
  const delsale = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(saleActions.delSaleFB(props.id));
  };

  const editsale = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/salewrite/${props.id}`);
  };

  return (
    <React.Fragment>
      <UL>
        <LI>
          <Title>쿠폰 아이디</Title>
          <P>{props.id}</P>
        </LI>
        <LI>
          <Title>쿠폰 타이틀</Title>
          <P>{props.couponTitle}</P>
        </LI>
        <LI>
          <Title>쿠폰 부제목</Title>
          <P>{props.couponSubTitle}</P>
        </LI>

        <LI>
          <Title>쿠폰 타입</Title>
          <P>{props.couponType}</P>
        </LI>
        <LI>
          <Title>쿠폰 브랜드</Title>
          <P>{props.couponBrand}</P>
        </LI>
        <LI>
          <P>{props.couponUrl}</P>
        </LI>
        <LI>
          <Title>쿠폰 생성일</Title>
          <P>{props.couponCreate}</P>
        </LI>
        <LI>
          <Title>쿠폰 만료일</Title>
          <P>{props.couponDespire}</P>
        </LI>
      </UL>
      <Button bg="#FF8F00" color="white" _onClick={editsale}>
        수정
      </Button>
      <Button bg="#FF8F00" margin="10px 0" color="white" _onClick={delsale}>
        삭제
      </Button>
    </React.Fragment>
  );
};

const Title = styled.p`
  font-weight: bold;
`;
const P = styled.p`
  font-weight: bold;
  color: #ff8f00;
`;
const UL = styled.ul`
  padding-left: 0;
`;

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  height: 42px;
  line-height: 20px;
`;

export default Coupon;
