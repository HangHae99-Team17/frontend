import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardType from "../components/CardType";
import TeleType from "../components/TeleType";
import InterType from "../components/InterType";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [cardtype, setCardtype] = useState("");
  const [telecom, setTelecom] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [type3, setType3] = useState("");

  const PassChange = (e) => {
    setPassword(e.target.value);
  };

  const cardtypetypeselect = (e) => {
    if (e.target.value === cardtype) {
      setCardtype("");
    } else {
      setCardtype(e.target.value);
    }
  };

  const telecomtypeselect = (e) => {
    if (e.target.value === telecom) {
      setTelecom("");
    } else {
      setTelecom(e.target.value);
    }
  };

  const typeselect = (e) => {
    if (!type1 && !type2 && !type3) {
      setType1(e.target.value);
    }

    if (type1 && !type2 && !type3) {
      setType2(e.target.value);
    }

    if (!type1 && type2 && !type3) {
      setType1(e.target.value);
    }

    if (!type1 && !type2 && type3) {
      setType1(e.target.value);
    }

    if (!type1 && type2 && type3) {
      setType1(e.target.value);
    }

    if (type1 && !type2 && type3) {
      setType2(e.target.value);
    }

    if (type1 && type2 && !type3) {
      setType3(e.target.value);
    }
  };

  const typecancle = (e) => {
    if (e.target.value === type1) {
      setType1("");
    }
    if (e.target.value === type2) {
      setType2("");
    }
    if (e.target.value === type3) {
      setType3("");
    }
  };

  useEffect(() => {
    if (user_info) {
      setUserId(user_info.userEmail);
      setCardtype(user_info.cardType);
      setTelecom(user_info.telecom);
      setType1(user_info.type1);
      setType2(user_info.type2);
      setType3(user_info.type3);
    }
  }, [user_info]);

  const editUser = () => {

    const user_info = {
      nickname: "",
      password: password,
      telecom: telecom,
      cardType: cardtype,
      type1: type1,
      type2: type2,
      type3: type3,
    };

    dispatch(userActions.edituserFB(user_info));
    setPassword("");
  };

  return (
    <React.Fragment>
      <EditUserBox>
        <GridBox>
          <Notice>내 정보 수정</Notice>
          <Notice>{userid}</Notice>
          <PasswordBox>
            <PasswordInput
              type="password"
              required="required"
              placeholder="비밀번호 확인"
              value={password}
              onChange={PassChange}
            />
          </PasswordBox>
          <Notice>통신사 변경</Notice>
          <TeleType
            mode="useredit"
            telecom={telecom}
            telecomtypeselect={telecomtypeselect}
          />
        </GridBox>
        <GridBox>
          <Notice>카드사 변경</Notice>
          <CardType
            mode="useredit"
            cardtype={cardtype}
            cardtypetypeselect={cardtypetypeselect}
          />
        </GridBox>
        <GridBox>
          <Notice>관심사 변경</Notice>
          <InterType
            mode="useredit"
            type1={type1}
            type2={type2}
            type3={type3}
            typeselect={typeselect}
            typecancle={typecancle}
          />
          <Button onClick={editUser}>변경사항 저장하기</Button>
        </GridBox>
      </EditUserBox>
    </React.Fragment>
  );
};

const EditUserBox = styled.div`
  width: 375px;
  margin: 0 auto;
  @media screen and (min-width: 1028px) {
    display: flex;
    flex-flow: row wrap;
    width: 1200px;
    height: 600px;
    margin-top: 20px;
font-size:16px;
  }
`;

const GridBox = styled.div`
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: 1028px) {
    width: 400px;
    height: 600px;
  }
`;

const PasswordBox = styled.div`
  width: 100%;
  margin: 10px auto;
`;

const PasswordInput = styled.input`
  width: 88%;
  color: #ff8f00;
  border: none;
  border-bottom: 1px solid #e4e4e4;
  color: #e4e4e4;
  height: 30px;
  margin-left: 20px;
  font-size: 16px;
  border-radius: 5px;
  :focus {
    outline: 1px solid #ff8f00;
  }
  :valid {
    border-bottom: 1px solid orange;
    color: orange;
  }
`;
const Notice = styled.p`
  width: 88%;
  margin: 15px auto;
  font-weight: bold;
`;
const Button = styled.div`
width:90%;
height:40px;
margin: 12px auto;
font-weight:bold;
background-color:#FF8F00;
border-radius:5px;
text-align:center;
color:white;
line-height:38px;
cursor:pointer;
@media screen and (min-width:1028px){
  width:85%;
`;

export default EditUser;
