import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';

const AdminSignup = () => {
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        username: "",
        password: "",
        password1: "",
        admintoken:""
    });

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const {email, username, password, password1, admintoken} = signup_info;

    const signup = () => {

        const user_info = {
            userEmail: email,
            password: password,
            nickname:username,
            telecom:"",
            cardType:"",
            type1:"",
            type2:"",
            type3:"",
            admin:admin,
            adminToken:admintoken
        }

        dispatch(userActions.signupFB(user_info))
    }

    const admincheck = () => {
        if(admin === false){
            setAdmin(true);
        }else{
            setAdmin(false)
        }
    }

    useEffect(()=> {
        if(password !== password1){
            setPasswordcheck("비밀번호가 일치하지 않습니다.")
            return
        }else{
            setPasswordcheck("비밀번호가 일치합니다")
            return
        }
    },[password, password1])

    return (
        <React.Fragment>
            <div>
                <p>이메일</p>
                <input type="text" name="email" value={email} onChange={onChange}/>
            </div>
            <div>
                <p>비밀번호</p>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <p>비밀번호확인</p>
                <input type="password" name="password1" value={password1} onChange={onChange}/>
                <p>{passwordcheck}</p>
            </div>
            <p>관리자십니까?</p>
            <button onClick={admincheck}>예</button>
            {admin?(<input type="text" name="admintoken" value={admintoken} onChange={onChange}/>):("")}
            <button onClick={signup}>가입하기</button>
        </React.Fragment>
    );
};

export default AdminSignup;