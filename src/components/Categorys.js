import React, { useState } from 'react';
import { history } from "../redux/configureStore"

const Categorys = (props) => {
    const category = ["뷰티","식품","가전","kt","skt"]
    console.log(props)
   

    return (
        // history.go(0) -> 새로고침을 안해도 카테고리를 옮길 수 있도록 하는것
        <React.Fragment>
             {category.map((item)=>{
                return <div onClick={()=>{history.push(`/api/category/${item}`); history.go(0)}}>{item}</div>
            })

            }
            <div onClick={()=>{history.push(`/api/detail/${props.id}`)}}>
                
            <p>couponCreate : {props.couponCreate}</p>
            <p>couponDesc : {props.couponDesc}</p>
            <p>couponDespire : {props.couponDespire}</p>
            <p>couponImage : {props.couponImage}</p>
            <p>couponTitle : {props.couponTitle}</p>
            <p>couponType : {props.couponType}</p>
            <p>couponUrl : {props.couponUrl}</p>
            </div>
            
        </React.Fragment>
    );
};

export default Categorys;