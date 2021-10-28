import React,{useState} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { checkValue } from "../shared/regExp";

const SignUp = () => {
    const dispatch = useDispatch();
    const [email_double, setEmail_Double] = useState("");
    const emailcheck = useSelector((state) => state.user.useremail);
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        username: "",
        password: "",
        password1: "",
        telecom:"",
        cardtype:"",
        type1:"",
        type2:"",
        type3:""
    });

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const {email, username, password, password1, telecom, cardtype, type1, type2, type3} = signup_info;

    const signup = () => {



        if(!email){
            setEmail_Double("엥 이메일이 비었는데요?")
            return
        }



        const user_info = {
            userEmail: email,
            password: password,
            nickname:username,
            telecom:telecom,
            cardType:cardtype,
            type1:type1,
            type2:type2,
            type3:type3
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
            <p>통신사</p>
            <input type="text" name="telecom" value={telecom} onChange={onChange}/>
            <p>카드사</p>
            <input type="text" name="cardtype" value={cardtype} onChange={onChange}/>
            <p>타입1</p>
            <input type="text" name="type1" value={type1} onChange={onChange}/>
            <p>타입2</p>
            <input type="text"  name="type2" value={type2} onChange={onChange}/>
            <p>타입3</p>
            <input type="text" name="type3" value={type3} onChange={onChange}/>
            <button onClick={signup}>가입하기</button>
        </React.Fragment>
    );
};

export default SignUp;