import React,{useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import CardType from '../components/CardType';
import TeleType from '../components/TeleType';
import InterType from '../components/InterType';
import {password_ora,_8_20_ora,num_ora,en_ora,password_grey,_8_20_grey,num_grey,
en_grey} from '../image'

const SignUp = (props) => {
    const dispatch = useDispatch();
    
    const email_result = useSelector((state)=>state.user.email_check);
    const [emailmsg, setEmailMsg] = useState("");
    const [pwNumcheck, setPwNumCheck] = useState(false);
    const [pwEncheck, setPwEnCheck] = useState(false);
    const [pwlengcheck, setPwLengCheck] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState(false);
    
    const [emaildisplay,setEmailDisplay] = useState("block");
    const [passworddisplay,setPasswordDisplay] = useState("none");
    const [telecomdisplay,setTelecomDisplay]= useState("none");
    const [carddisplay,setCardDisplay] = useState("none");
    const [typedisplay,setTypeDisplay] = useState("none");
    const [progress,setProgress] = useState(60);
    
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
    };

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
    };

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
    };

    const next = () => {
        if(emaildisplay === "block"){
            setEmailDisplay("none");
            setPasswordDisplay("block");
            setProgress(progress+60);
        }else if(passworddisplay === "block"){
            setPasswordDisplay("none");
            setTelecomDisplay("block");
            setProgress(progress+60);
        }else if(telecomdisplay ==="block"){
            setTelecomDisplay("none");
            setCardDisplay("block");
            setProgress(progress+60);
        }else if(carddisplay==="block"){
            setCardDisplay("none");
            setTypeDisplay("block");
            setProgress(progress+60);
        }
    };

    useEffect(() => {
        history.block((location, action) => {
            if (action === 'POP'&&passworddisplay === 'block') {
                setPasswordDisplay("none");
                setEmailDisplay("block");
                setProgress(progress-60);
                return false;
            }else if(action === 'POP'&&telecomdisplay === 'block'){
                setTelecomDisplay("none");
                setPasswordDisplay("block");
                setProgress(progress-60);
                return false;
            }else if(action === 'POP'&&carddisplay === 'block'){
                setCardDisplay("none");
                setTelecomDisplay("block");
                setProgress(progress-60);
                return false;
            }else if(action === 'POP'&&typedisplay === 'block'){
                setTypeDisplay("none");
                setCardDisplay("block");
                setProgress(progress-60);
                return false;
            }
        });
    }, [next]);
    
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
            admin:"",
            adminToken:""
        }
        dispatch(userActions.signupFB(user_info))
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
            <Progress progress={progress}/>
            <SignUpBox>
                <EmailBox display={emaildisplay}>
                    <p>이메일을 입력해주세요.</p>
                    <div>
                        <input type="text" name="email" value={email} onChange={onChange}/>
                    </div>
                    <div>
                        <span>{emailmsg}</span>
                    </div>
                    <div>
                        {emailmsg==="사용 가능한 이메일입니다."?(
                            <NextButton onClick={next} bgcolor="orange">다음</NextButton>
                        ):(
                            <NextButton bgcolor="grey">다음</NextButton>
                        )}
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
                        <NextButton bgcolor={type1&&type2&&type3?"orange":"gray"}onClick={signup}>완료</NextButton>
                    </div>
                </TypeBox>
            </SignUpBox>
        </React.Fragment>
    );
};

const Progress = styled.div`
    border-top: solid 1px orange;
    position: relative;
    margin-top: -35px;
    z-index: 3;
    width: ${props => `${props.progress}px`};
    -webkit-transition: width 1s;
    transition: width 1s;
`;


const SignUpBox = styled.div`
    margin: 0 auto;
    width: 375px;
`;

const EmailBox = styled.div`
    margin-left:30px;
    display: ${props => props.display};
    p{
        font-weight: bold;
    }
    input{

        width: 313px;
        height: 37px;
        border-radius: 5px;
        border:1px solid #D5D5D5;
    }
    div{
        margin-top: 30px;
    }
`;

const PasswordBox = styled.div`
    margin-left:30px;
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
            width: 328px;
            height: 37px;
            border:none;
        }
        input:focus {
            outline:none;
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
        margin-top: 50px;
    }
`;

const TelecomBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left: 30px;
    }
    h4{
        margin-left:20px;
    }
`;

const CardtypeBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left: 30px;
    }
    h4{
        margin-left:20px;
    }
`;

const TypeBox = styled.div`
    display: ${props => props.display};
    .nextbutton{
        margin-left:30px;
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
    cursor:pointer;
`;

export default SignUp;