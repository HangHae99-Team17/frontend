import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";

const Main = () => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const logout = () => {
        dispatch(userActions.logoutFB())
    }
    return (
        <React.Fragment>
            {is_login?(<div><p>로그인됨</p></div>):(<div><p>로그인안됨</p></div>)}
            <button onClick={logout}>로그아웃</button>
        </React.Fragment>
    );
};

export default Main;