import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { actionCreators as userActions } from "../redux/modules/user";

const Useractive = () => {

    const dispatch = useDispatch();

    const useractive = () =>{
        dispatch(userActions.useractiveFB("yes"))
    }

    const usernoactive = () => {
        dispatch(userActions.useractiveFB("no"))
    }


    return (
        <Wrap>
            <Text>본계정은 회원 <Span>탈퇴한 계정</Span>입니다. 
            <br/>계정을 <Span>활성화</Span> 하시겠습니까?</Text>
            <Button onClick={useractive}>계정을 활성화 합니다.</Button>
            <Button2 onClick={usernoactive}>탈퇴를 진행합니다.</Button2>
        </Wrap>
    );
};

const Wrap = styled.div`
width : 375px;
margin-top : 50%;
text-align : center
`
const Text = styled.p`
font-size : 25px;
font-weight : 400;
`
const Span = styled.span`
color : #F09643;
font-weight : 600;
`
const Button = styled.button`
width :  300px;
height : 40px;
margin : 0 auto;
font-size : 20px;
font-weight : 400;
border : none;
border-radius: 4px;
background-color : #F09643
`
const Button2 = styled.button`
background-color : white;
border : none;
text-decoration: underline;
margin-top : 10px;
font-size : 17px;
`
export default Useractive;