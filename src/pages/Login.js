import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import { history } from "../redux/configureStore";

const Login = () => {
    const dispatch = useDispatch();
    const [login_info, setLogin_Info] = useState({
        email: "",
        password: "",
    });
    const {email, password} = login_info;

    const onChange = (e) => {
        setLogin_Info({...login_info, [e.target.name]: e.target.value});
    }

    const submitLogin = () => {
        if(email === "" || password === ""){  //공란 체크
            alert("아이디 혹은 비밀번호를 입력하세요.");
            return;
        }

        const user_info = {
            userEmail:email,
            password:password
        }

        dispatch(userActions.loginFB(user_info)) //로그인 정보 디스패치
        setLogin_Info({  //로그인인풋 초기화
            email: "",
            password: ""
        });
    }

    return (
        <React.Fragment>
            <LoginBox>
                <IdInputBox>
                    <input type="text" placeholder="아이디(이메일)" name="email" value={email} onChange={onChange}/>
                </IdInputBox>
                <PasswordInputBox>
                    <input type="password" placeholder="비밀번호" name="password" value={password} onChange={onChange}/>
                </PasswordInputBox>
                <LoginButton onClick={submitLogin}>로그인하기</LoginButton>
                <SignupBox>
                    <button onClick={()=>{
                        window.location.replace('/signup');
                    }}>회원가입</button>
                </SignupBox>
            </LoginBox>
        </React.Fragment>
    );
};

const LoginBox = styled.div`
    text-align: center;

`;

const IdInputBox = styled.div`
    margin-bottom: 10px;
    margin-top: 30px;
    input{
        width: 328px;
        height: 37px;
        border:1px solid #D5D5D5;
    }
`;

const PasswordInputBox = styled.div`
    margin-bottom: 60px;
    input{
        width: 328px;
        height: 37px;
        border:1px solid #D5D5D5;
    }
`;

const LoginButton = styled.button`
    width: 328px;
    height: 45px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
`;

const SignupBox = styled.div`
    button{
        font-size: 13px;
        border:none;
        background-color: white;
    }
`;
export default Login;