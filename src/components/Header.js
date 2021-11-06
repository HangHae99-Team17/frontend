import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import { Button } from '../elements';

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const is_session = sessionStorage.getItem("token") ? true : false;

    const user = useSelector((state) => state.user.user);
    const [admin,setAdmin] = useState(user?user:"");
    const [show,setShow] = useState(true);
    const [isOpen, setMenu] = useState(false);

    const logout = () => {
        dispatch(userActions.logoutFB());
        history.push("/");
    };

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }

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
                <HeaderBox>
                {/* {is_login?(
                <div>
                    <p>로그인됨</p>
                    <button onClick={logout}>로그아웃</button>
                    <button onClick={()=>{
                        history.push("/mypage");
                    }}>마이페이지</button>
                    <button onClick={()=>{
                        history.push('/salebox');
                    }}>쿠폰함</button>
                </div>):(<div>
                    <p>로그인안됨</p>
                    <button onClick={()=>{
                        window.location.replace("/signup")
                    }}>회원가입</button>
                    <button onClick={()=>{
                        history.push('/login');
                    }}>로그인</button>
                    </div>)}
                    <div>
                        {admin.role === "ADMIN"?(<button onClick={()=>{
                            history.push("/salelist");
                        }}>할인보기</button>):""}
                    </div> */}
                    <LeftBox>
                        <div>GOOD.DA</div>
                    </LeftBox>
                    <rightBox>
                        <button onClick={toggleMenu}>햄버거</button>
                    </rightBox>
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
    background-color:red;
    padding: 10px;
`;

const LeftBox = styled.div`

`;

const rightBox = styled.div`

`;

export default Header;