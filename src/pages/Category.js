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
height:100vh;
`

const Litext = styled.div`
font-size:16px;
margin: 0 auto;
width:355px;
font-weight:bold;
padding-top:30px;
padding-bottom:20px;
padding-left:20px;
`

const Ul = styled.ul`
display:flex;
margin: 0 auto;
width:375px;
flex-wrap: wrap;
justify-content:space-evenly;
padding-left:0px;    
`


const Li = styled.li`
list-style :  none;
background-color:white;
border: 2px solid #F09643;
margin:10px;
height:100px;
width:100px;
border-radius:10px;
font-weight : 600;
text-align:center;
color:#F09643;
font-size:20px;
line-height:100px;
`
export default Category;