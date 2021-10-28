import React from 'react';

const Userinfo = (props) => {
    return (
        <div>
            <div>
            마이페이지
            <h1>개인정보 수정</h1>
            <p>닉네임</p>
            {props.nickname}
            <p>통신사</p>
            {props.telecom}
            <p>카드사</p>
            {props.cardType}
            <p>타입1</p>
            {props.type1}
            <p>타입2</p>
            {props.type2}
            <p>타입3</p>
            {props.type3}
            </div>
        </div>
    );
};

export default Userinfo;