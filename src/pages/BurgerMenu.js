import React from 'react';
import styled from 'styled-components'
import {history} from '../redux/configureStore'

const BurgerMenu = ()=>{
    return(
        <div>
            <ul>
                <Box onClick={()=>{history.push("/category")}}>카테고리</Box>
                <Box onClick={()=>{history.push("/folders")}}>보관함</Box>
                <Box onClick={()=>{history.push("/mypage")}}>마이페이지</Box>
                <Box onClick={()=>{history.push("/api/main")}}>나의 카테고리</Box>
            </ul>
        </div>
    )
}
const Box = styled.li`
border : none;
list-style : none;
margin : 10px;
`
export default BurgerMenu;