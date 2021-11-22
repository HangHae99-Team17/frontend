import React,{useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
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
            <AllBox>
            <EmailBox>
                <Notice>이메일 입력</Notice>
                <Input required="required" type="text" name="email" value={email} placeholder="이메일" onChange={onChange}/>
            </EmailBox>
            <PasswordBox>
                <Notice>비밀번호 입력</Notice>
                <Input required="required" type="password" name="password" placeholder="비밀번호" value={password} onChange={onChange}/>
                <Notice>비밀번호확인</Notice>
                <Input required="required" type="password" name="password1" placeholder="비밀번호" value={password1} onChange={onChange}/>
                <Notice2>{passwordcheck}</Notice2>
            </PasswordBox>

            
            <AdminBox>
            <Notice>관리자십니까?</Notice>
            <button onClick={admincheck}>예</button>
            {admin?(<Input type="text" name="admintoken" value={admintoken} onChange={onChange}/>):("")}
            <button onClick={signup}>가입하기</button>
            </AdminBox>
            </AllBox>
        </React.Fragment>
    );
};


const EmailBox = styled.div`
margin: 0 auto;
width:320px;
`

const Input = styled.input`
border:none;
width:310px;
font-size:15px;
border-bottom: 1px solid gray;
height:30px;
:focus{
    outline:1px solid orange;
    border-radius:5px;
}
:valid{
    border-bottom: 1px solid orange;
    border-radius:5px;
    color:orange;
}
`
const PasswordBox = styled.div`
margin:0 auto;
width:320px;
`


const AllBox = styled.div`
width:100%;
`

const Notice = styled.div`
font-weight:bold;
padding:30px 0 15px 0;
`

const Notice2 = styled.div`
font-weight:bold;
padding:30px 0 15px 0;
color:orange;
`

const AdminBox = styled.div`
width:320px;
margin:0 auto;
`


export default AdminSignup;