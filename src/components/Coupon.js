import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as saleActions } from "../redux/modules/sale";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { edit } from "../image";

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
      <AllBox>
        <ImgBox onClick={()=>{history.push(`/api/detail/${props.id}`)}}>
          <Img src={props.couponLogo} />
        </ImgBox>
        <TextBox onClick={()=>{history.push(`/api/detail/${props.id}`)}}>
          <Title>
            <Strong>{props.couponBrand}</Strong> 에서
          </Title>

          <Title>
            <Strong>{props.couponSubTitle}</Strong> 할인 받기
          </Title>
        </TextBox>
        <EditButton onClick={editsale}>
          <img src={edit} />
        </EditButton>
        
        </AllBox>
        {/* <Button bg="#FF8F00" margin="10px 0" color="white" _onClick={delsale}>
        삭제
      </Button> */}
    </React.Fragment>
  );
};


const AllBox = styled.div`
position:relative;
width:100%;
height:90px;
  backgorund-color: blue;
  display:flex;
`;
const ImgBox = styled.div`
position:relative;
top:26px;
  width: 40px;
  height: 40px;
`;

const Img = styled.img`
position:absolute;
top:20%;
  width: 40px;
`;

const TextBox = styled.div`
width:400px;
`;

const Title = styled.p`
  font-weight: bold;
  padding-left:35px;
`;
const Strong = styled.span`
  color: #f09643;
`;

const EditButton = styled.button`
position:relative;
background-color:white;
border:none;
top:25px;
right:-15px;
width:40px;
height:40px;
`;



export default Coupon;
