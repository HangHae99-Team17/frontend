import React from "react";
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import { history } from "../redux/configureStore";



const InterestType = (props) => {
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu)
    const is_login = useSelector((state) => state.user.is_login);
    console.log(is_login)

    const MenuArr = [userMenu?.type1,userMenu?.type2,userMenu?.type3,userMenu?.telecom, userMenu?.cardType]
    console.log(MenuArr)

    return(
        is_login?(
        <div>
        <ul>
        {
        MenuArr?.map((item) => {
          return (
                <Bar onClick={()=>{history.push(`/api/main/${item}`)}}>{item}</Bar>
          );
        })}
        </ul>
        </div>
        ):(
            <div> </div>
        )
    )    
}

const Bar = styled.li`
display : inline-block;
margin : 20px;
cursor : pointer;
`

export default InterestType;