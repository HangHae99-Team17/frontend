import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import {Frame_101, x, x_black, gooddablack, gooddawhite} from '../image'

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const is_session = sessionStorage.getItem("token") ? true : false;
    const [show,setShow] = useState(true);
    const [open, setOpen] = useState(false);

    const logout = () => {
        dispatch(userActions.logoutFB());
        history.push("/");
    };
    
    useEffect(() => {
        if(history.location.pathname==="/signup"){
            setShow(!show);
        }

        if(is_session){
            dispatch(userActions.loginCheckFB());
        }
    }, []);

        return (
            <React.Fragment>
                {show?(
                <HeaderBox color={open?"black":"white"} fontcolor={open?"white":"black"}>
                    {open?(
                    <>
                        <IconBox>
                            <img src={gooddawhite} onClick={()=>{history.push('/')}}/>
                        </IconBox>
                        <StyledBurger open={open} onClick={()=> setOpen(!open)}>
                            {is_login?(<button onClick={logout}>LOGOUT</button>):
                            (<button onClick={()=>{history.push('/login');}}>LOGIN</button>)}
                            <img src={x}/>
                        </StyledBurger>
                    </>
                    ):(
                    <>
                        <IconBox>
                            <img src={gooddablack} onClick={()=>{history.push('/')}}/>
                        </IconBox>
                        <StyledBurger open={open} onClick={()=> setOpen(!open)}>
                            <img src={Frame_101}/>
                        </StyledBurger>
                    </>
                    )}
                    <Ul open={open}>
                        <li onClick={()=>{history.push('/category');setOpen(!open)}}>카테고리</li>
                        <li onClick={()=>{if(is_login){
                            history.push('/salebox');setOpen(!open)}
                            else{alert("로그인이 필요한 서비스입니다!")}}}>보관함</li>
                        <li onClick={()=>{if(is_login){
                            history.push('/edituser');setOpen(!open)}
                            else{alert("로그인이 필요한 서비스입니다!")}}}>마이페이지</li>
                        <li onClick={()=>{
                            if(is_login){
                            history.push('/api/main');setOpen(!open)}
                            else{alert("로그인이 필요한 서비스입니다!")}}}>나의 카테고리</li>
                        <li onClick={()=>{
                            window.location.replace('/signup');
                            setOpen(!open)}}>회원가입
                        </li>
                    </Ul>
                </HeaderBox>):(
                <SignupHeaderBox>
                    <div>
                        <img src={x_black} onClick={()=>{history.goBack();}}/>
                    </div>
                </SignupHeaderBox>)}
            </React.Fragment>
        );
};

const SignupHeaderBox =  styled.div`
    background-color: white;
    top: 0;
    width: 100%;
    position: fixed;
    height: 60px;
    border-bottom: solid 1px grey;
    div{
        margin-top:20px;
        margin-right:10px;
        float: right;
    }
`;

const HeaderBox = styled.div`
    display:flex;
    justify-content: space-between;
    background-color:${props => props.color};
    color:${props => props.fontcolor};
    align-items:center;
    height: 80px;
    top: 0;
    width: 100%;
    position: fixed;
    border-bottom: solid 1px grey;
    z-index : 1;
`;

const IconBox = styled.div`
    margin-left: 20px;
`;

const StyledBurger = styled.div`
    display:flex;
    margin-left: 20px;
    padding-right: 20px;

    button{
        border: none;
        cursor: pointer;
        color:white;
        background-color: black;
        font-size: 20px;
    }
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    background-color: black;
    position: fixed;
    transform: ${({open}) => open? 'translateX(0)':'translateX(100%)'};
    top: 64px;
    right: 0;
    height: 100vh;
    width: 350px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li{
        padding: 18px 10px;
        color: #fff;
        font-size : 20px;
        font-weight : bold;
    }
`;

export default Header;