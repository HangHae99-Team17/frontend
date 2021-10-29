import React,{useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import {useSelector } from "react-redux";

const Userinfo = (props) => {

    const dispatch = useDispatch();
    const user_info = useSelector((state)=> state.user.user);
    const [password,setPassword] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        username: null,
        telecom:null,
        cardtype:null,
        type1:null,
        type2:null,
        type3:null,
    });

    useEffect(()=>{
        if(user_info){
            setSignUp_Info({
                username:user_info.nickname,
                telecom:user_info.telecom,
                cardtype:user_info.cardType,
                type1:user_info.type1,
                type2:user_info.type2,
                type3:user_info.type3
            });
        }
    },[user_info])

    const {username, telecom, cardtype, type1, type2, type3} = signup_info;

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }
    const changepassword = (e) => {
        setPassword(e.target.value)
    }

    const deluser = () => { 
        dispatch(userActions.deluserFB(password));
    }

    const editUser = () => {

        const user_info = {
            nickname:username,
            password:password,
            telecom:telecom,
            cardType:cardtype,
            type1:type1,
            type2:type2,
            type3:type3
        }
        dispatch(userActions.edituserFB(user_info));
        setPassword("");
    }
    
    return (
        <div>
            마이페이지
            <h1>개인정보</h1>
            <p>닉네임</p>
            {props.nickname}
            <input type="text" name="username" value={username==null?'':username} onChange={onChange}/>
            <p>통신사</p>
            <input type="text" name="telecom" value={telecom==null?'':telecom} onChange={onChange}/>
            <p>카드사</p>
            <input type="text" name="cardtype" value={cardtype==null?'':cardtype} onChange={onChange}/>
            <p>타입1</p>
            <input type="text" name="type1" value={type1==null?'':type1} onChange={onChange}/>
            <p>타입2</p>
            <input type="text" name="type2" value={type2==null?'':type2} onChange={onChange}/>
            <p>타입3</p>
            <input type="text" name="type3" value={type3==null?'':type3} onChange={onChange}/>
            <p>패스워드를 입력해주세요</p>
            <input type="password" name="password" value={password} onChange={changepassword}/>
            <button onClick={editUser}>회원정보수정</button>
            <button onClick={deluser}>회원탈퇴</button>
        </div>
    );
};

export default Userinfo;