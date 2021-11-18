import React from 'react';
import styled from 'styled-components';
import { skt, kt, lg } from '../image';


const TeleType = (props) => {

    const tels = [
        {tel_id:0,tel_name:"SKT",tel_img:skt},
        {tel_id:1,tel_name:"KT",tel_img:kt},
        {tel_id:2,tel_name:"LG",tel_img:lg},
    ]

    if(props.mode==="signup"){
        return (
            <TeleTypeBox>
                {tels.map((tel) => {
                    if(props.telecom === tel.tel_name){
                        return(
                            <SignUpButton image={tel.tel_img} bg="orange" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</SignUpButton>
                        )
                    }else{
                        return(
                            <SignUpButton image={tel.tel_img} bg="grey" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</SignUpButton>
                        )
                    }
                })}
            </TeleTypeBox>
        );
    }else if(props.mode==="useredit"){
        return (
            <TeleTypeBox>
                {tels.map((tel) => {
                    if(props.telecom === tel.tel_name){
                        return(
                            <UserEditButton bg="orange" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</UserEditButton>
                        )
                    }else{
                        return(
                            <UserEditButton bg="grey" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</UserEditButton>
                        )
                    }
                })}
            </TeleTypeBox>
        );
    }
    
};

const UserEditButton = styled.button`
height:50px;
width:100px;
border-radius:7px;
`;

const SignUpButton = styled.button`
    background-position: 33px 20px;
    background-repeat: no-repeat;
    background-image: url(${props => props.image});
    line-height: 140px;
    margin-bottom: 15px;
    border: none;
    width:99px;
    height:99px;
    border-radius: 5px;
    background-color: white;
    color: ${props => props.bg};
    border: solid 1px ${props => props.bg};
`;

const TeleTypeBox = styled.div`
    display:flex;
    width: 375px;
    flex-wrap: wrap;
    justify-content:space-evenly;
    padding-left:0px;
`;

export default TeleType;