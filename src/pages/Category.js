import React from 'react';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const Category = ()=>{
    const all_category = ["타입1","타입2","타입3","타입4","타입5","타입6"]
    return(
        <Div>
             <Litext>할인 정보를 확인할<br/>카테고리를 선택해주세요.</Litext>
            <Ul>
               
            {all_category.map((item)=>{
                return(
                    <Li onClick={()=>{history.push(`/api/categorydetail/${item}`)}}> {item} </Li>
                )
            })}
            </Ul>
        </Div>
    )
}

const Div = styled.div`
background-color:gray;
height:750px;
`

const Litext = styled.div`
font-size:20px;
color:black;
margin: 0 auto;
width:750px;
font-weight:bold;
padding-top:30px;
padding-bottom:20px;
`

const Ul = styled.ul`
display:flex;
margin: 0 auto;
width:750px;
height:600px;
background-color:black;
`


const Li = styled.li`

list-style :  none;
background-color:white;
border: 1px solid black;
margin:10px;
height:100px;
width:100px;
border-radius:10px;
text-align:center;
font-size:20px;
line-height:95px;
`
export default Category;