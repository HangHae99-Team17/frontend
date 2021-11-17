import React from 'react';
import styled from 'styled-components';
import { cup, airplane, bicycle, cart, film_frame, gift, hamburger, house, knive_fork, monitor2, scissors, t_shirt } from '../image';

const InterType = (props) => {

    const interests = [
        {inter_id:0,inter_type:"카페,디저트",inter_img:<img src={cup}/>},
        {inter_id:1,inter_type:"음식점",inter_img:<img src={knive_fork}/>},
        {inter_id:2,inter_type:"패스트푸드",inter_img:<img src={hamburger}/>},
        {inter_id:3,inter_type:"편의점,마트",inter_img:<img src={cart}/>},
        {inter_id:4,inter_type:"뷰티,미용",inter_img:<img src={scissors}/>},
        {inter_id:5,inter_type:"패션",inter_img:<img src={t_shirt}/>},
        {inter_id:6,inter_type:"건강,스포츠",inter_img:<img src={bicycle}/>},
        {inter_id:7,inter_type:"여행,숙박",inter_img:<img src={airplane}/>},
        {inter_id:8,inter_type:"문화",inter_img:<img src={film_frame}/>},
        {inter_id:9,inter_type:"가전,디지털",inter_img:<img src={monitor2}/>},
        {inter_id:10,inter_type:"가구",inter_img:<img src={house}/>},
        {inter_id:11,inter_type:"생활",inter_img:<img src={gift}/>},
    ]
    
    if(props.mode === "signup"){
        return (
            <React.Fragment>
                <InterTypeBox>
                {interests.map((interest) => {
                    if(props.type1 !== interest.inter_type && props.type2 !== interest.inter_type && props.type3 !== interest.inter_type){
                        return(
                            <SignUpButton bg="grey" onClick={props.typeselect} value={interest.inter_type}>{interest.inter_img}<br/>{interest.inter_type}</SignUpButton>
                        )
                    }else{
                        return(
                            <SignUpButton bg="orange" onClick={props.typecancle} value={interest.inter_type}>{interest.inter_img}<br/>{interest.inter_type}</SignUpButton>
                        )
                    }
                })}
                </InterTypeBox>
            </React.Fragment>
        );
    }else if(props.mode === "useredit"){
        return(
            <React.Fragment>
                <InterTypeBox>
                {interests.map((interest) => {
                    if(props.type1 !== interest.inter_type && props.type2 !== interest.inter_type && props.type3 !== interest.inter_type){
                        return(
                            <UserEditButton bg="grey" onClick={props.typeselect} value={interest.inter_type}>{interest.inter_type}</UserEditButton>
                        )
                    }else{
                        return(
                            <UserEditButton bg="orange" onClick={props.typecancle} value={interest.inter_type}>{interest.inter_type}</UserEditButton>
                        )
                    }
                })}
                </InterTypeBox>
            </React.Fragment>
        )
    }else if(props.mode === "saleinfo"){
        return(
            <React.Fragment>
                <InterTypeBox>
                {interests.map((interest) => {
                    if(props.coupontype !== interest.inter_type){
                        return(
                            <SignUpButton bg="grey" onClick={props.categoryselect} value={interest.inter_type}>{interest.inter_img}<br/>{interest.inter_type}</SignUpButton>
                        )
                    }else{
                        return(
                            <SignUpButton bg="orange" onClick={props.categoryselect} value={interest.inter_type}>{interest.inter_img}<br/>{interest.inter_type}</SignUpButton>
                        )
                    }
                })}
                </InterTypeBox>
            </React.Fragment>
        )
    }
};


const UserEditButton = styled.button`
width:100px;
height:50px;
border-radius:8px;
margin-top:15px;
`;

const SignUpButton = styled.button`
    margin-bottom: 15px;
    border: none;
    width:99px;
    height:99px;
    border-radius: 5px;
    background-color: white;
    color: ${props => props.bg};
    border: solid 1px ${props => props.bg};
`;

const InterTypeBox = styled.div`
    display:flex;
    margin: 0 auto;
    width: 375px;
    flex-wrap: wrap;
    justify-content:space-evenly;
`;




export default InterType;