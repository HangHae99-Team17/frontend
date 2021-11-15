import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import CardType from '../components/CardType';
import TeleType from '../components/TeleType';
import InterType from '../components/InterType';
import {useDispatch, useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";

const EditUser = (props) => {
    const dispatch = useDispatch();
    const user_info = useSelector((state)=> state.user.user);
    const [userid,setUserId] = useState("");
    const [password,setPassword] = useState("");
    const [cardtype,setCardtype] = useState("");
    const [telecom,setTelecom] = useState("");
    const [type1,setType1] = useState("");
    const [type2,setType2] = useState("");
    const [type3,setType3] = useState("");

    const PassChange = (e) =>{
        setPassword(e.target.value)
    }

    const cardtypetypeselect = (e) => {
        if(e.target.value === cardtype){
            setCardtype("")
        }else{
            setCardtype(e.target.value);
        }
    }

    const telecomtypeselect = (e) =>{
        if(e.target.value === telecom){
            setTelecom("")
        }else{
            setTelecom(e.target.value);
        }
    };

    const typeselect = (e) => {
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

    useEffect(()=>{
        if(user_info){
            setUserId(user_info.userEmail);
            setCardtype(user_info.cardType);
            setTelecom(user_info.telecom);
            setType1(user_info.type1);
            setType2(user_info.type2);
            setType3(user_info.type3);
        }
    },[user_info]);

    const editUser = () => {
        console.log(telecom)
        console.log(cardtype)
        console.log(type1)
        console.log(type2)
        console.log(type3)
        const user_info = {
            nickname:"",
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
        <React.Fragment>
            <EditUserBox>
                <div>
                    <p>내 정보 수정</p>
                    <p>{userid}</p>
                </div>
                <div>
                    <p>비밀번호</p>
                    <input type="password" value={password} onChange={PassChange}/>
                </div>
                <div>
                    <p>통신사 변경</p>
                    <TeleType mode="useredit" telecom={telecom} telecomtypeselect={telecomtypeselect}/>
                </div>
                <div>
                    <p>카드사 변경</p>
                    <CardType mode="useredit" cardtype={cardtype} cardtypetypeselect={cardtypetypeselect}/>
                </div>
                <div>
                    <p>관심사 변경</p>
                    <InterType mode="useredit" type1={type1} type2={type2} type3={type3} typeselect={typeselect} typecancle={typecancle}/>
                </div>
                <div>
                    <button onClick={editUser}>변경사항 저장하기</button>
                </div>
            </EditUserBox>
        </React.Fragment>
    );
};

const EditUserBox = styled.div`
    
`;

export default EditUser;