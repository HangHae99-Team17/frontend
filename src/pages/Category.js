import React from 'react';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import { cup, airplane, bicycle, cart, film_frame, gift, hamburger, house, knive_fork, monitor2, scissors, t_shirt } from '../image';

const Category = ()=>{
    const all_category = [
{title:"카페,디저트", img:<img src={cup}/>},
{title:"음식점", img:<img src={knive_fork}/>},
{title:"패스트푸드", img:<img src={hamburger}/>},
{title:"편의점,마트", img:<img src={cart}/>},
{title:"뷰티,미용", img:<img src={scissors}/>},
{title:"패션", img:<img src={t_shirt}/>},
{title:"건강,스포츠", img:<img src={bicycle}/>},
{title:"여행,숙박", img:<img src={airplane}/>},
{title:"문화", img:<img src={film_frame}/>},
{title:"가전,디지털", img:<img src={monitor2}/>},
{title:"가구,생활", img:<img src={house}/>},
{title:"쇼핑,잡화", img:<img src={gift}/>},
]
    return(
        <Div>
            <Litext>할인 정보를 확인할<br/>카테고리를 선택해주세요.</Litext>
            <Ul>
            {all_category.map((item)=>{
                return(
                    <Li onClick={()=>{history.push(`/api/categorydetail/${item.title}`)}}><BOX> <BoxImg>{item.img}</BoxImg>{item.title}</BOX> </Li>
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
padding-top:15px;
padding-bottom:15px;
padding-left:20px;
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