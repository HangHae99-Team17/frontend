import React,{useEffect} from 'react';
import {useSelector } from "react-redux";
import Userinfo from '../components/Userinfo';

const MyPage = () => {
    const user_info = useSelector((state)=> state.user.user);

    return (
        <React.Fragment>
            <Userinfo {...user_info}/>
        </React.Fragment>
    );
};

export default MyPage;