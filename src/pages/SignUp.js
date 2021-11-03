import React,{useEffect, useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { checkValue } from "../shared/regExp";

const SignUp = () => {
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState(false);
    const [email_double, setEmail_Double] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const emailcheck = useSelector((state) => state.user.useremail);
    const [type1,setType1] = useState("");
    const [type2,setType2] = useState("");
    const [type3,setType3] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        username: "",
        password: "",
        password1: "",
        telecom:"",
        cardtype:"",
        admintoken:""
    });

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const {email, username, password, password1, telecom, cardtype, admintoken} = signup_info;

    const signup = () => {

        const user_info = {
            userEmail: email,
            password: password,
            nickname:username,
            telecom:telecom,
            cardType:cardtype,
            type1:type1,
            type2:type2,
            type3:type3,
            admin:admin,
            adminToken:admintoken
        }

        dispatch(userActions.signupFB(user_info))
    }

    const checkemail = () => {

        const user_email = {
            userEmail: email,
        }
        dispatch(userActions.checkemailFB(user_email))

        console.log(emailcheck)
    }

    const admincheck = () => {
        if(admin === false){
            setAdmin(true);
        }else{
            setAdmin(false)
        }
    }

    const typeselect = (e) => {

        if(type1 === "" && type2 === "" && type3 === ""){
            setType1(e.target.value);
        }

        if(type1 && type2 === "" && type3 === ""){
            setType2(e.target.value);
        }

        if(type1 === "" && type2 && type3 === ""){
            setType2(e.target.value);
        }

        if(type1 === "" && type2 === "" && type3){
            setType1(e.target.value);
        }  

        if(type1 === "" && type2 && type3){
            setType1(e.target.value);
        }
        
        if(type1 && type2 === "" && type3){
            setType2(e.target.value);
        }
        
        if(type1 && type2 && type3 === ""){
            setType3(e.target.value);
        }
    }

    const typecancle = (e) => {
        if(e.target.value === type1){
            setType1("");
        }
        if(e.target.value === type2){
            setType2("");
        }
        if(e.target.value === type3){
            setType3("");
        }
    }

    useEffect(()=> {
        if(email === ""){
            setEmail_Double("이메일이 비었어요!")
            return
        }else{
            setEmail_Double("")
        }
        
    },[email])

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
            <p>이메일</p>
            <input type="text" name="email" value={email} onChange={onChange}/>
            <p>{email_double}</p>
            <button onClick={checkemail}>중복체크</button>
            <p>유저이름</p>
            <input type="text" name="username" value={username} onChange={onChange}/>
            <p>비밀번호</p>
            <input type="password" name="password" value={password} onChange={onChange}/>
            <p>비밀번호확인</p>
            <input type="password" name="password1" value={password1} onChange={onChange}/>
            <p>{passwordcheck}</p>
            <p>통신사</p>
            <input type="text" name="telecom" value={telecom} onChange={onChange}/>
            <p>카드사</p>
            <input type="text" name="cardtype" value={cardtype} onChange={onChange}/>
            <div>
            <p>타입 선택</p>
            {type1 !== "타입1" && type2 !== "타입1" && type3 !== "타입1" ?(<button onClick={typeselect} value="타입1">타입1선택</button>):(<button onClick={typecancle} value="타입1">타입1취소</button>)}
            {type1 !== "타입2"&&type2 !== "타입2"&&type3 !== "타입2"?(<button onClick={typeselect} value="타입2">타입2선택</button>):(<button onClick={typecancle} value="타입2">타입2취소</button>)}
            {type1 !== "타입3"&&type2 !== "타입3"&&type3 !== "타입3"?(<button onClick={typeselect} value="타입3">타입3선택</button>):(<button onClick={typecancle} value="타입3">타입3취소</button>)}
            {type1 !== "타입4"&&type2 !== "타입4"&&type3 !== "타입4"?(<button onClick={typeselect} value="타입4">타입4선택</button>):(<button onClick={typecancle} value="타입4">타입4취소</button>)}
            {type1 !== "타입5"&&type2 !== "타입5"&&type3 !== "타입5"?(<button onClick={typeselect} value="타입5">타입5선택</button>):(<button onClick={typecancle} value="타입5">타입5취소</button>)}
            {type1 !== "타입6"&&type2 !== "타입6"&&type3 !== "타입6"?(<button onClick={typeselect} value="타입6">타입6선택</button>):(<button onClick={typecancle} value="타입6">타입6취소</button>)}
            </div>
            
            <p>관리자십니까?</p>
            <button onClick={admincheck}>예</button>
            {admin?(<input type="text" name="admintoken" value={admintoken} onChange={onChange}/>):("")}
            <button onClick={signup}>가입하기</button>
        </React.Fragment>
    );
};

export default SignUp;