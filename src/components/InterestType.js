import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {actionCreators} from '../redux/modules/user'

const InterestType = () => {
    const dispatch = useDispatch();
    const userMenu = useSelector((state)=>state.user.user)
    console.log(userMenu)
    const is_login = useSelector((state) => state.user.is_login);
    console.log(is_login)

    React.useEffect(()=>{
        dispatch(actionCreators.signupFB())
    },[]);

    return(
        is_login?(
            <div>

            </div>
        ):(
            <div> </div>
        )
    )    
}

export default InterestType;