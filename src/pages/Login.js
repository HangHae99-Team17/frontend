import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import { history } from '../redux/configureStore';


const Login = () => {
    const dispatch = useDispatch();
    const [meg,setMeg] = useState("");
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
            setMeg("아이디 혹은 비밀번호를 입력하세요.");
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
                <h1>계정이 있으신가요?</h1>
                <IdInputBox>
                    <input type="text" placeholder="이메일" required="required" name="email" value={email} onChange={onChange}/>
                </IdInputBox>
                <PasswordInputBox>
                    <input type="password" placeholder="비밀번호" required="required" name="password" value={password} onChange={onChange}/>
                </PasswordInputBox>
                <p>{meg}</p>
                <LoginButton onClick={submitLogin}>로그인하기</LoginButton>
                <SignupButton onClick={()=>{
                    history.replace('/signup');
                }}>계정이 없어요. 1분만에 가입하기!!</SignupButton>
            </LoginBox>
        </React.Fragment>
    );
};



const LoginBox = styled.div`
    text-align: center;
    width:400px;
    margin:40px auto;
@media screen and (min-width:1028px){
    margin:90px auto;
    transform:scale(1.3)
}

`

const IdInputBox = styled.div`
    margin-bottom: 40px;
    margin-top: 60px;
    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }
    input:focus{
        outline:2px solid orange;
    }
    
    input:valid{
        outline:2px solid orange;
    }
`;

const PasswordInputBox = styled.div`
    margin-bottom: 40px;
    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }
    input:focus{
        outline:2px solid orange;
    }
    
    input:valid{
        outline:2px solid orange;
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
    margin-bottom: 40px;
`;

const SignupButton = styled.button`
    width: 328px;
    height: 45px;
    background-color: white;
    color: orange;
    border: 1px solid orange;
    border-radius: 5px;
    font-size: 15px;
`;

export default Login;