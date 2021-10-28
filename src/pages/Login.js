import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

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
            <p>이메일</p>
            <input type="text" name="email" value={email} onChange={onChange}/>
            <p>패스워드</p>
            <input type="password" name="password" value={password} onChange={onChange}/>
            <button onClick={submitLogin}>로그인</button>
        </React.Fragment>
    );
};

export default Login;