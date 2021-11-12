import React from 'react';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const Category = ()=>{
    const all_category = ["카페,디저트","음식점","패스트푸드","편의점,마트","뷰티,미용","패션","건강,스포츠","여행,숙박","문화","가전,디지털","가구","생활"]
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
border: 1.5px solid #F09643;
margin:10px;
height:100px;
width:100px;
border-radius:10px;
font-weight : 600;
text-align:center;
color:#F09643;
font-size:16px;
line-height:100px;
`
export default Category;