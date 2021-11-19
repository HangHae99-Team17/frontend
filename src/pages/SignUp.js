import React,{useEffect, useState,useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import CardType from '../components/CardType';
import TeleType from '../components/TeleType';
import InterType from '../components/InterType';
import {done_black,done_orange,password_ora,_8_20_ora,num_ora,en_ora,password_grey,_8_20_grey,num_grey,
en_grey} from '../image'

const SignUp = (props) => {
    const dispatch = useDispatch();
    const email_result = useSelector((state)=>state.user.email_check);
    const [emailmsg, setEmailMsg] = useState("");

    const [pwNumcheck, setPwNumCheck] = useState(false);
    const [pwEncheck, setPwEnCheck] = useState(false);
    const [pwlengcheck, setPwLengCheck] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState(false);

    const [service,setService] = useState(false);

    const [emaildisplay,setEmailDisplay] = useState("block");
    const [passworddisplay,setPasswordDisplay] = useState("none");
    const [termsdisplay,setTermsDisplay] = useState("none");
    const [telecomdisplay,setTelecomDisplay]= useState("none");
    const [carddisplay,setCardDisplay] = useState("none");
    const [typedisplay,setTypeDisplay] = useState("none");

    const [telecom,setTelecom] = useState("");
    const [cardtype,setCardtype] = useState("");
    const [type1,setType1] = useState("");
    const [type2,setType2] = useState("");
    const [type3,setType3] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        username: "",
        password: "",
        password1: ""
    });
    

    const {email, username, password, password1 } = signup_info;

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const telecomtypeselect = (e) =>{
        console.log(e.target.value)
        if(e.target.value === telecom){
            setTelecom("")
        }else{
            setTelecom(e.target.value);
        }
    };

    const cardtypetypeselect = (e) => {
        console.log(e.target.value)
        if(e.target.value === cardtype){
            setCardtype("")
        }else{
            setCardtype(e.target.value);
        }
    }

    const typeselect = (e) => {
        
        console.log(e.target.value);
        
        console.log(type1)
        console.log(type2)
        console.log(type3)
        if(!type1 && !type2 && !type3){
            setType1(e.target.value);
        }

        if(type1 && !type2 && !type3){
            setType2(e.target.value);
            console.log("dd")
        }

        if(!type1 && type2 && !type3){
            setType1(e.target.value);
        }

        if(!type1 && !type2 && type3){
            setType1(e.target.value);
        }  

        if(!type1 && type2 && type3){
            setType1(e.target.value);
        }
        
        if(type1 && !type2 && type3){
            setType2(e.target.value);
        }
        
        if(type1 && type2 && !type3){
            setType3(e.target.value);
        }
    }

    const typecancle = (e) => {
        console.log(e.target.value);
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

    const next = () => {
        if(emaildisplay === "block"){
            setEmailDisplay("none");
            setPasswordDisplay("block");
        }else if(passworddisplay === "block"){
            if(!password){
                window.alert("비밀번호를 입력해주세요!")
                return
            }
            if(passwordcheck === "최소 8 자 최대 10자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요."){
                window.alert("비밀번호 규격에 맞게 입력해주세요")
                return
            }
            if(passwordcheck === "비밀번호가 일치하지 않습니다."){
                window.alert("비밀번호를 확인해주세요!")
                return
            }
            setPasswordDisplay("none");
            setTermsDisplay("block");
        }else if(termsdisplay === "block"){
            setTermsDisplay("none");
            setTelecomDisplay("block");
        }else if(telecomdisplay ==="block"){
            if(!telecom){
                window.alert("통신사를 선택해주세요!")
                return
            }
            setTelecomDisplay("none");
            setCardDisplay("block");
        }else if(carddisplay==="block"){
            if(!cardtype){
                window.alert("카드타입을 선택해주세요!")
                return
            }
            setCardDisplay("none");
            setTypeDisplay("block");
        }
    };

    const signup = () => {

        if(!type1&&!type2&&!type3){
            window.alert("관심사 1개 이상 선택해주세요!");
            return;
        }
        const user_info = {
            userEmail: email,
            password: password,
            nickname:username,
            telecom:telecom,
            cardType:cardtype,
            type1:type1,
            type2:type2,
            type3:type3,
            admin:"",
            adminToken:""
        }
        dispatch(userActions.signupFB(user_info))
    };

    const servicecheck = () => {
        if(!service){
            setService(true);
        }else{
            setService(false);
        }
        
    };

    useEffect(()=> {
        
        const emailregEXP = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        
        if(email){
            if(!emailregEXP.test(email)){
                setEmailMsg("이메일 형식이 맞지 않습니다.")
                
            }else{

                const emailcheck = {
                    userEmail: email
                }
                dispatch(userActions.emailCheckFB(emailcheck));
                
                if(email_result === "success"){
                    setEmailMsg("사용 가능한 이메일입니다.")
                }else{
                    setEmailMsg("사용중인 이메일입니다.")
                }
            }
        }else{
            setEmailMsg("")
        }
        return () => {
        }
    },[email,email_result]);

    useEffect(()=> {
        const enregEXP = /[a-z]/ig;
        const numregEXP = /[0-9]/g;
        //최소 8 자 최대 10자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
        if(password){

            if(password.length >= 8&&password.length < 20){
                setPwLengCheck(true);
            }else{
                setPwLengCheck(false);
            }

            if(enregEXP.test(password)){
                setPwEnCheck(true);
            }else{
                setPwEnCheck(false);
            }

            if(numregEXP.test(password)){
                setPwNumCheck(true);
            }else{
                setPwNumCheck(false);
            }

            if(password === password1){
                setPasswordcheck(true);
            }else{
                setPasswordcheck(false);
            }
            
        }else{
            setPwLengCheck(false);
            setPwEnCheck(false);
            setPwNumCheck(false);
        }
    },[password, password1]);

    

    return (
        <React.Fragment>
            <SignUpBox>
                <EmailBox display={emaildisplay}>
                    <p>이메일을 입력해주세요.</p>
                    <div>
                        <input type="text" name="email" required="required" value={email} onChange={onChange}/>
                    </div>
                    <div>
                        <span>{emailmsg}</span>
                    </div>
                    <div>
                        <NextButton onClick={emailmsg==="사용 가능한 이메일입니다."?next:""} bgcolor={emailmsg==="사용 가능한 이메일입니다."?"orange":"gray"}>다음</NextButton>
                    </div>
                </EmailBox>
                <PasswordBox display={passworddisplay} bgcolor={password1?"orange":"gray"}>
                    <div className="pwtitle">
                        <h3>비밀번호를 입력해주세요</h3>
                    </div>
                    <div className="pwinput">
                        <input type="password" placeholder="비밀번호" name="password" value={password} onChange={onChange}/>
                    </div>
                    <div className="pwcheckimage">
                        <img src={pwEncheck?en_ora:en_grey}/>
                        <img src={pwNumcheck?num_ora:num_grey}/>
                        <img src={pwlengcheck?_8_20_ora:_8_20_grey}/>
                    </div>
                    <div className="pwinput">
                        <input type="password" placeholder="비밀번호 확인" name="password1" value={password1} onChange={onChange}/>
                    </div>
                    <div className="pwcheckimage">
                        <img src={passwordcheck?password_ora:password_grey}/>
                    </div>
                    <div className="nextbutton">
                        {passwordcheck&&pwEncheck&&pwNumcheck&&pwlengcheck?(
                            <NextButton onClick={next} bgcolor="orange">다음</NextButton>
                        ):(
                            <NextButton bgcolor="grey">다음</NextButton>
                        )}
                    </div>
                </PasswordBox>
                <TermsBox display={termsdisplay}>
                    <h3>서비스 이용약관에 동의해주세요.</h3>
                    <div className="checkall">
                        <img src={service?done_orange:done_black} onClick={servicecheck}/>
                        <h4>모두 동의하기</h4>
                    </div>
                    <div className="checklist">
                        <ul>
                            <li><img src={service?done_orange:done_black}/>(필수) 약관 동의</li>
                            <li><img src={service?done_orange:done_black}/>(필수) 약관 동의</li>
                            <li><img src={service?done_orange:done_black}/>(선택) 약관 동의</li>
                            <li><img src={service?done_orange:done_black}/>(선택) 약관 동의</li>
                        </ul>
                    </div>
                    <div className="nextbutton">
                        {service?(
                        <NextButton onClick={next} bgcolor="orange">다음</NextButton>
                        ):(
                        <NextButton bgcolor="grey">다음</NextButton>
                        )}
                    </div>
                </TermsBox>
                <TelecomBox display={telecomdisplay} bgcolor={telecom?"orange":"gray"}>
                    <h4>어떤 통신사 혜택을 보여드릴까요?</h4>
                    <TeleType mode="signup" telecom={telecom} telecomtypeselect={telecomtypeselect}/>
                    <div className="nextbutton">
                        <NextButton bgcolor={telecom?"orange":"gray"} onClick={next}>다음</NextButton>
                    </div>
                </TelecomBox>
                <CardtypeBox display={carddisplay} bgcolor={cardtype?"orange":"gray"}>
                    <h4>어떤 카드사 혜택을 보여드릴까요?</h4>
                    <CardType mode="signup" cardtype={cardtype} cardtypetypeselect={cardtypetypeselect}/>
                    <div className="nextbutton">
                        <NextButton bgcolor={cardtype?"orange":"gray"} onClick={next}>다음</NextButton>
                    </div>
                </CardtypeBox>
                <TypeBox display={typedisplay} bgcolor={type1?"orange":"gray"}>
                    <h4>관심있는 3가지 선택하면 끝나요</h4>
                    <InterType mode="signup" type1={type1} type2={type2} type3={type3} typeselect={typeselect} typecancle={typecancle}/>
                    <div className="nextbutton">
                        <NextButton bgcolor={type1?"orange":"gray"}onClick={signup}>완료</NextButton>
                    </div>
                </TypeBox>
            </SignUpBox>
        </React.Fragment>
    );
};

const SignUpBox = styled.div`
    margin: 0 auto;
    width: 375px;
`;

const TermsBox = styled.div`
    margin-left:30px;
    display: ${props => props.display};
    .checkall{
        padding-left:15px;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        width: 300px;
        height: 50px;
        display: flex;
        align-items: center;
        img{
            margin-right:10px;
        }
    }
    .checklist{
        ul{
            margin-left:-25px;
            list-style:none;
            li{
                display:flex;
                align-items: center;
                margin-bottom:10px;
                font-size:13px;
                color: grey;
                img{
                    margin-right:10px;
                }
            }
        }
    }
`;

const EmailBox = styled.div`
    margin-left:30px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    input{
        padding:10px;
        width: 293px;
        height: 18px;
        font-size:15px;
        border-radius: 5px;
        border:none;
        border-bottom:1px solid #D5D5D5;
    }
    input:focus{
        outline:1px solid orange;
    }
    input:valid{
        border:none;
        border-bottom: 1px solid orange;
        color:orange;
    }
    div{
        margin-top: 30px;
    }
`;

const PasswordBox = styled.div`
    margin-left:35px;
    display: ${props => props.display};
    p{
        float:left;
        margin-left:15px;
        font-weight: bold;
    }

    .pwinput{
        width: 300px;
        border-bottom:1px solid #D5D5D5;
        input{
            font-size:16px;
            width: 280px;
            height: 17px;
            border:none;
            padding:10px;
            margin-top:5px;
        }
        input:focus {
            outline:1px solid orange;
            border-radius:5px;
            color:orange;
        }
        input:valid{
            color:orange;
            border-bottom:1px solid orange;
        }
    }
    .pwtitle{
        h3{
            float:left;
        }
    }
    .pwcheckimage{
        float: left;
    }

    .nextbutton{
        margin-top: 42px;
    }
    `;

const TelecomBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left: 33px;
    }
    h4{
        margin-left:20px;
    }
`;

const CardtypeBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left: 33px;
    }
    h4{
        margin-left:20px;
    }
`;

const TypeBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left: 33px;
    }
    h4{
        margin-left:20px;
    }
`;

const NextButton = styled.button`
    border-radius: 5px;
    border:none;
    width:320px;
    height:45px;
    color: white;
    background-color:${props => props.bgcolor};
`;

export default SignUp;