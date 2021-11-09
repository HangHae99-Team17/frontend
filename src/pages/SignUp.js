import React,{useEffect, useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from 'styled-components';
import { checkValue } from "../shared/regExp";
import {checkgray, checkgray2} from '../image'

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState("");
    const [emaildisplay,setEmailDisplay] = useState("block");
    const [passworddisplay,setPasswordDisplay] = useState("none");
    const [termsdisplay,setTermsDisplay] = useState("none");
    const [telecomdisplay,setTelecomDisplay]= useState("none");
    const [carddisplay,setCardDisplay] = useState("none");
    const [typedisplay,setTypeDisplay] = useState("none");
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
    };

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

    const next = () => {
        if(emaildisplay === "block"){
            setEmailDisplay("none");
            setPasswordDisplay("block");
        }else if(passworddisplay === "block"){
            setPasswordDisplay("none");
            setTermsDisplay("block");
        }else if(termsdisplay === "block"){
            setTermsDisplay("none");
            setTelecomDisplay("block");
        }else if(telecomdisplay ==="block"){
            setTelecomDisplay("none");
            setCardDisplay("block");
        }else if(carddisplay==="block"){
            setCardDisplay("none");
            setTypeDisplay("block");
        }
    };

    useEffect(()=> {
        if(password !== password1){
            setPasswordcheck("비밀번호가 일치하지 않습니다.")
            return
        }else{
            setPasswordcheck("비밀번호가 일치합니다")
            return
        }
    },[password, password1]);

    return (
        <React.Fragment>
            <EmailBox display={emaildisplay} bgcolor={email?"orange":"gray"}>
                <p>이메일을 입력해주세요.</p>
                <input type="text" name="email" value={email} onChange={onChange}/>
                <div>
                    <button onClick={next} >다음</button>
                </div>
            </EmailBox>
            <PasswordBox display={passworddisplay} bgcolor={password1?"orange":"gray"}>
                <p>비밀번호</p>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <p>비밀번호확인</p>
                <input type="password" name="password1" value={password1} onChange={onChange}/>
                <p>{passwordcheck}</p>
                <div>
                    <button onClick={next}>다음</button>
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
                    <button onClick={next}>다음</button>
                </div>
            </TermsBox>
            <TelecomBox display={telecomdisplay}>
                <p>통신사</p>
                <input type="text" name="telecom" value={telecom} onChange={onChange}/>
                <button onClick={next}>다음</button>
            </TelecomBox>
            <CardtypeBox display={carddisplay}>
                <p>카드사</p>
                <input type="text" name="cardtype" value={cardtype} onChange={onChange}/>
                <button onClick={next}>다음</button>
            </CardtypeBox>
            <TypeBox display={typedisplay}>
                <p>타입 선택</p>
                {type1 !== "타입1" && type2 !== "타입1" && type3 !== "타입1" ?(<button onClick={typeselect} value="타입1">타입1선택</button>):(<button onClick={typecancle} value="타입1">타입1취소</button>)}
                {type1 !== "타입2"&&type2 !== "타입2"&&type3 !== "타입2"?(<button onClick={typeselect} value="타입2">타입2선택</button>):(<button onClick={typecancle} value="타입2">타입2취소</button>)}
                {type1 !== "타입3"&&type2 !== "타입3"&&type3 !== "타입3"?(<button onClick={typeselect} value="타입3">타입3선택</button>):(<button onClick={typecancle} value="타입3">타입3취소</button>)}
                {type1 !== "타입4"&&type2 !== "타입4"&&type3 !== "타입4"?(<button onClick={typeselect} value="타입4">타입4선택</button>):(<button onClick={typecancle} value="타입4">타입4취소</button>)}
                {type1 !== "타입5"&&type2 !== "타입5"&&type3 !== "타입5"?(<button onClick={typeselect} value="타입5">타입5선택</button>):(<button onClick={typecancle} value="타입5">타입5취소</button>)}
                {type1 !== "타입6"&&type2 !== "타입6"&&type3 !== "타입6"?(<button onClick={typeselect} value="타입6">타입6선택</button>):(<button onClick={typecancle} value="타입6">타입6취소</button>)}
                <button onClick={signup}>가입하기</button>
            </TypeBox>
        </React.Fragment>
    );
};

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

    .nextbutton{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
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

    div{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
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

    div{
        margin-top: 200px;
        button{
            border-radius: 5px;
            border:none;
            width:328px;
            height:45px;
            color: white;
            background-color:${props => props.bgcolor};
        }
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