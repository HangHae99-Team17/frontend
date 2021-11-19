import React from 'react';
import styled from 'styled-components';
import { shinhan, hyundai, samsung, kb, lotte, woori, nh, bc, toss, kakao, hana, citi } from '../image';

const CardType = (props) => {
    
    const cards = [
        {card_id:0,card_name:"신한카드",card_img:<img src={shinhan}/>},
        {card_id:1,card_name:"현대카드",card_img:<img src={hyundai}/>},
        {card_id:2,card_name:"삼성카드",card_img:<img src={samsung}/>},
        {card_id:3,card_name:"국민카드",card_img:<img src={kb}/>},
        {card_id:4,card_name:"롯데카드",card_img:<img src={lotte}/>},
        {card_id:5,card_name:"하나카드",card_img:<img src={hana}/>},
        {card_id:6,card_name:"우리카드",card_img:<img src={woori}/>},
        {card_id:7,card_name:"농협카드",card_img:<img src={nh}/>},
        {card_id:8,card_name:"씨티카드",card_img:<img src={citi}/>},
        {card_id:9,card_name:"BC카드",card_img:<img src={bc}/>},
        {card_id:10,card_name:"토스카드",card_img:<img src={toss}/>},
        {card_id:11,card_name:"카카오카드",card_img:<img src={kakao}/>},
    ]

    if(props.mode==="signup"){
        return(
            <React.Fragment>
                <CardTypeBox>
                    {cards.map((card) => {
                        if(props.cardtype === card.card_name){
                            return(
                                <SignUpButton className="signupbutton" bg="orange" key={card.card_id} value={card.card_name} onClick={props.cardtypetypeselect}>{card.card_img}<br/>{card.card_name}</SignUpButton>
                            )
                        }else{
                            return(
                                <SignUpButton className="signupbutton" bg="grey" key={card.card_id} value={card.card_name} onClick={props.cardtypetypeselect}>{card.card_img}<br/>{card.card_name}</SignUpButton>
                            )
                        }
                    })}
                </CardTypeBox>
            </React.Fragment>
        )
    }else if(props.mode==="useredit"){
        return(
            <React.Fragment>
                <CardTypeBox>
                    {cards.map((card) => {
                        if(props.cardtype === card.card_name){
                            return(
                                <UserEditButton className="usereditbutton" bg="orange" key={card.card_id} value={card.card_name} onClick={props.cardtypetypeselect}>{card.card_name}</UserEditButton>
                            )
                        }else{
                            return(
                                <UserEditButton className="usereditbutton" bg="grey" key={card.card_id} value={card.card_name} onClick={props.cardtypetypeselect}>{card.card_name}</UserEditButton>
                            )
                        }
                    })}
                </CardTypeBox>
            </React.Fragment>
        )
    }
};

const CardTypeBox = styled.div`
    display:flex;
    margin: 0 auto;
    width: 375px;
    flex-wrap: wrap;
    justify-content:space-evenly;
    padding-left:0px;
`;

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

export default CardType;