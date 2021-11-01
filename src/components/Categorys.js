import React, { useState } from 'react';
import { history } from "../redux/configureStore"

const Categorys = (props) => {
    const category = ["뷰티","식품","가전","kt","skt"]
   

    return (
        <React.Fragment>
             {category.map((item)=>{
                return <div onClick={()=>{history.push(`/api/category/${item}`)}}>{item}</div>
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