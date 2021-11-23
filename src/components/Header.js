import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import {Frame_101, x, gooddablack, gooddawhite, edit_3} from '../image'

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);
    const is_session = sessionStorage.getItem("token") ? true : false;
    const [open, setOpen] = useState(false);

    const logout = () => {
        setOpen(!open)
        dispatch(userActions.logoutFB());
        history.push("/");
    };
    
    useEffect(() => {
        if(is_session){
            dispatch(userActions.loginCheckFB());
        }
    }, []);

        return (
            <React.Fragment>
                <HeaderBox color={open?"black":"white"} fontcolor={open?"white":"black"}>
                    {!open?(
                    <>
                        <IconBox>
                            <img src={gooddablack} alt="icon" onClick={()=>{history.push('/')}}/>
                        </IconBox>
                        <StyledBurger>
                        {user_info?.role === "ADMIN"?(
                                <img src={edit_3} alt="write" onClick={()=>{
                                    history.push('/salewrite')
                                }}/>
                            ):""}
                            <img src={Frame_101} alt="burgerbutton" open={open} onClick={()=> setOpen(!open)}/>
                        </StyledBurger>
                    </>
                    ):(
                    <>
                        <IconBox>
                            <img src={gooddawhite} alt="icon" onClick={()=>{history.push('/')}}/>
                        </IconBox>
                        <StyledBurger open={open} onClick={()=> setOpen(!open)}>
                            <img src={x} alt="x"/>
                        </StyledBurger>
                    </>
                    )}
                    <Ul open={open}>
                        <li onClick={()=>{
                            history.push('/category');
                            setOpen(!open)
                        }}>카테고리</li>
                        {is_login?(
                            <>
                            <li onClick={()=>{
                                history.push('/salebox');
                                setOpen(!open)}
                            }>보관함</li>
                            <li onClick={()=>{
                                history.push('/edituser');
                                setOpen(!open)}
                            }>마이페이지</li>
                            <li onClick={()=>{
                                history.push('/loginmain');
                                setOpen(!open); 
                            }}>나의 카테고리</li>
                            </>
                        ):("")}
                        {is_login?(
                            <LoginButton onClick={logout}>Goodda 로그아웃</LoginButton>
                                ):(
                            <LoginButton onClick={()=>{history.push('/login');setOpen(!open)}}>Goodda 로그인하기</LoginButton>)}
                    </Ul>
                </HeaderBox>
            </React.Fragment>
        );
};

const HeaderBox = styled.div`
    display:flex;
    justify-content: space-between;
    background-color:${props => props.color};
    color:${props => props.fontcolor};
    align-items:center;
    height: 65px;
    top: 0;
    width: 100%;
    position: fixed;
    border-bottom: solid 1px #9E9E9E;
    z-index : 1;
`;

const IconBox = styled.div`
    margin-left: 20px;
    margin-top:13px;
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

    img{
        margin-left:10px;
    }
`;

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    background-color: black;
    position: fixed;
    transform: ${({open}) => open? 'translateX(0)':'translateX(100%)'};
    top: 50px;
    right: 0;
    height: 100vh;
    width: 360px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li{
        padding: 18px 10px;
        color: #fff;
        font-size : 20px;
        font-weight : bold;
    }
`;

const LoginButton = styled.button`
    margin-top:20px;
    background-color:#FF8F00;
    width:93%;
    height:46px;
    border-radius:5px;
    border:none;
    font-weight:bold;
    font-size:16px;
`;

export default Header;