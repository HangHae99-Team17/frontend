import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from 'styled-components';

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const is_session = sessionStorage.getItem("token") ? true : false;

    const user = useSelector((state) => state.user.user);
    const [admin,setAdmin] = useState(user?user:"");
    const [show,setShow] = useState(true);
    const [open, setOpen] = useState(false);

    const logout = () => {
        dispatch(userActions.logoutFB());
        history.push("/");
    };

    useEffect(()=>{
        if(user){
            setAdmin(user);
        }
    },[user]);
    
    useEffect(() => {
        if(history.location.pathname==="/signup"){
            setShow(false);
        }

        if(is_session){
            dispatch(userActions.loginCheckFB());
        }
    }, []);

    if(show){
        return (
            <React.Fragment>
                <HeaderBox color={open?"black":"white"} fontcolor={open?"white":"black"}>
                    <IconBox>
                        GOOD.DA
                    </IconBox>
                    <ButtonBox>
                        <StyledBurger open={open} onClick={()=> setOpen(!open)}>
                            {open?"X":"버거버튼"}
                        </StyledBurger>
                        <Ul open={open}>
                            <li>카테고리</li>
                            <li>보관함</li>
                            <li>마이페이지</li>
                        </Ul>
                    </ButtonBox>
                </HeaderBox>
                
            </React.Fragment>
        );
    }else{
        return null;
    }
};

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
`;

const IconBox = styled.div`

`;

const ButtonBox = styled.div`

`;

const StyledBurger = styled.div`
    width:  2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
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
    }
`;

export default Header;