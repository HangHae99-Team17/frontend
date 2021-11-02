import React, { useState } from 'react';
import { history } from "../redux/configureStore"

const Categorys = (props) => {
    const category = ["뷰티","식품","가전","kt","skt"]
   

    return (
        // history.go(0) -> 새로고침을 안해도 카테고리를 옮길 수 있도록 하는것
        <React.Fragment>
             {category.map((item)=>{
                return <div onClick={()=>{history.push(`/api/category/${item}`); history.go(0)}}>{item}</div>
            })

            }
            <p>couponCreate : {props.couponCreate}</p>
            <p>couponDesc : {props.couponDesc}</p>
            <p>couponDespire : {props.couponDespire}</p>
            <p>couponImage : {props.couponImage}</p>
            <p>couponTitle : {props.couponTitle}</p>
            <p>couponType : {props.couponType}</p>
            <p>couponUrl : {props.couponUrl}</p>

        </React.Fragment>
    );
};

export default Categorys;