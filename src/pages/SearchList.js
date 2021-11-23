import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import styled from 'styled-components';
import MainCoupon from '../components/MainCoupon';
import { listCreators } from "../redux/modules/main";

const SearchList = () => {
    const dispatch = useDispatch();
    const search = useSelector((state)=>state.main.searchList);

    React.useEffect(()=>{
        const val = localStorage.getItem("search");
        dispatch(listCreators.searchListFB(val));
    },[]);
    
    return (
        <React.Fragment>
            {search.length !== 0?(
                <SearchBox>
                    {search.map((coupon)=>{
                        return(
                            <MainCoupon key={coupon.id} mode="search" {...coupon} />
                    );
                })}
                </SearchBox>
            ):(
                <SearchNoBox>
                    <p>데이터가 없어요!</p>
                </SearchNoBox>
            )}
        </React.Fragment>
    );
};

const SearchBox = styled.div`
    width: 372px;
    margin: auto;
`;

const SearchNoBox = styled.div`
    p{
        text-align:center;
    }
`;

export default SearchList;