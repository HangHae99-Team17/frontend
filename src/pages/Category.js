import React from 'react';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const Category = ()=>{
    const all_category = ["타입1","타입2","타입3","타입4","타입5","타입6"]
    return(
        <div>
            <ul>
            {all_category.map((item)=>{
                return(
                    <Li onClick={()=>{history.push(`/api/categorydetail/${item}`)}}> {item} </Li>
                )
            })}
            </ul>
        </div>
    )
}

const Li = styled.li`
list-style :  none;
`
export default Category;