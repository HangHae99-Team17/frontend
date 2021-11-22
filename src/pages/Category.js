import React from 'react';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import { cup, airplane, bicycle, cart, film_frame, gift, hamburger, house, knive_fork, monitor2, scissors, t_shirt } from '../image';

const Category = ()=>{
    const all_category = [
{id:0,title:"카페,디저트", img:<img src={cup}/>},
{id:1,title:"음식점", img:<img src={knive_fork}/>},
{id:2,title:"패스트푸드", img:<img src={hamburger}/>},
{id:3,title:"편의점,마트", img:<img src={cart}/>},
{id:4,title:"뷰티,미용", img:<img src={scissors}/>},
{id:5,title:"패션", img:<img src={t_shirt}/>},
{id:6,title:"건강,스포츠", img:<img src={bicycle}/>},
{id:7,title:"여행,숙박", img:<img src={airplane}/>},
{id:8,title:"문화", img:<img src={film_frame}/>},
{id:9,title:"가전,디지털", img:<img src={monitor2}/>},
{id:10,title:"가구,생활", img:<img src={house}/>},
{id:11,title:"쇼핑,잡화", img:<img src={gift}/>},
]
    return(
        <Div>
            <Litext>할인 정보를 확인할<br/>카테고리를 선택해주세요.</Litext>
            <Ul>
            {all_category.map((item)=>{
                return(
                    <Li key={item.id} onClick={()=>{history.push(`/api/categorydetail/${item.title}`);history.go(0)}}><BOX> <BoxImg>{item.img}</BoxImg>{item.title}</BOX> </Li>
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
font-size:18px;
margin: 0 auto;
width:355px;
font-weight:bold;
padding-bottom:10px;
padding-left:15px;
line-height:30px;
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
font-size:14px;
`
const BOX = styled.div`
color:black;
padding-top:22px;
line-height:25px;
`
const BoxImg = styled.div`
`


export default Category;