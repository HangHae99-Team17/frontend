import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import CardType from '../components/CardType';
import TeleType from '../components/TeleType';
import InterType from '../components/InterType';
import {checkgray, checkgray2, skt, kt, lg, shinhan, hyundai, samsung, kb, lotte, woori, nh, bc, toss, kakao, hana, citi, cup, hamburger, airplane, bicycle, cart, film_frame, gift, house, monitor2, knive_fork, scissors,t_shirt} from '../image'

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [passwordcheck, setPasswordcheck] = useState("");
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

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const {email, username, password, password1 } = signup_info;

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
        console.log(e.target.value)
        if(type1 === "" && type2 === "" && type3 === ""){
            setType1(e.target.value);
        }

        if(type1 && type2 === "" && type3 === ""){
            setType2(e.target.value);
        }

        if(type1 === "" && type2 && type3 === ""){
            setType1(e.target.value);
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

    useEffect(()=> {
        const pwregEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,10}$/;
        //최소 8 자 최대 10자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
        if(password){
            if(!pwregEXP.test(password)){
                setPasswordcheck("최소 8 자 최대 10자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 입력해주세요.")
            }else{
                if(password !== password1){
                    setPasswordcheck("비밀번호가 일치하지 않습니다.")
                }else{
                    setPasswordcheck("비밀번호가 일치합니다.")
                }
            }
        }else{
            setPasswordcheck("");
        }
    },[password, password1]);

    return (
        <React.Fragment>
            <EmailBox display={emaildisplay} bgcolor={email?"orange":"gray"}>
                <p>이메일을 입력해주세요.</p>
                <input type="text" name="email" value={email} onChange={onChange}/>
                <div>
                    <NextButton onClick={next} >다음</NextButton>
                </div>
            </EmailBox>
            <PasswordBox display={passworddisplay} bgcolor={password1?"orange":"gray"}>
                <p>비밀번호</p>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <p>비밀번호확인</p>
                <input type="password" name="password1" value={password1} onChange={onChange}/>
                <p>{passwordcheck}</p>
                <div>
                    <NextButton onClick={next}>다음</NextButton>
                </div>
            </PasswordBox>
            <TermsBox display={termsdisplay}>
                <p>서비스 약관을 확인해주세요.</p>
                <div className="allcheck">
                    <div>
                        <img src={checkgray}/>
                        <span>모두 동의</span>
                    </div>
                </div>
                <div className="checklist">
                    <ul>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 만 14세 이상</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 이용약관 동의</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[필수] 개인정보 처리방침 동의</span>
                        </li>
                        <li>
                            <img src={checkgray2}/>
                            <span>[선택] 광고성 정보 수신 및 마케팅 활용 동의</span>
                        </li>
                    </ul>
                </div>
                <div className="nextbutton">
                    <NextButton onClick={next}>다음</NextButton>
                </div>
            </TermsBox>
            <TelecomBox display={telecomdisplay} bgcolor={telecom?"orange":"gray"}>
                <p>통신사를 선택해주세요.</p>
                <TeleType mode="signup" telecom={telecom} telecomtypeselect={telecomtypeselect}/>
                <div className="nextbutton">
                    <NextButton onClick={next} >다음</NextButton>
                </div>
            </TelecomBox>
            <CardtypeBox display={carddisplay} bgcolor={cardtype?"orange":"gray"}>
                <CardType mode="signup" cardtype={cardtype} cardtypetypeselect={cardtypetypeselect}/>
                <div className="nextbutton">
                    <NextButton onClick={next}>다음</NextButton>
                </div>
            </CardtypeBox>
            <TypeBox display={typedisplay} bgcolor={type1?"orange":"gray"}>
                <p>관심사를 선택해주세요.(최대 3개)</p>
                <InterType mode="signup" type1={type1} type2={type2} type3={type3} typeselect={typeselect} typecancle={typecancle}/>
                <div className="nextbutton">
                    <NextButton onClick={signup}>회원가입</NextButton>
                </div>
            </TypeBox>
        </React.Fragment>
    );
};

const NextButton = styled.button`
    border-radius: 5px;
    border:none;
    margin:25px auto;
    width:334px;
    height:45px;
    color: white;
    background-color:${props => props.bgcolor};
`;

const TermsBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    .allcheck{
        border-bottom: solid 1px grey;
        width: 328px;
        div{
            display:flex;
            align-items: center;
            margin-bottom:10px;
            span{
                font-size: 13px;
                margin-left: 5px;
                color:grey;
            }
        }
    }
    
    .checklist{
        ul{
            margin-left:-20px;
            list-style:none;
            li{
                margin-bottom:10px;
                span{
                    margin-left:10px;
                    color:grey;
                    font-size: 13px;
                }
            }
        }
    }
`;

const EmailBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};

    p{
        font-weight: bold;
    }

    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }
`;

const PasswordBox = styled.div`
    margin-left: 15px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }

    input{
        width: 328px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }
`;

const TelecomBox = styled.div`
    display: ${props => props.display};
`;

const CardtypeBox = styled.div`
    display: ${props => props.display};
`;

const TypeBox = styled.div`
    display: ${props => props.display};
`;

export default SignUp;