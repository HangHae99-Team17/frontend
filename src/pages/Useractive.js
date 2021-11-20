import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Useractive = () => {

    const dispatch = useDispatch();

    const useractive = () =>{
        dispatch(userActions.useractiveFB("yes"))
    }

    const usernoactive = () => {
        dispatch(userActions.useractiveFB("no"))
    }


    return (
        <div>
            <p>계정 활성화?</p>
            <button onClick={useractive}>예</button>
            <button onClick={usernoactive}>아니요</button>
        </div>
    );
};

export default Useractive;