import React,{useState, useCallback} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import styled from 'styled-components';
import MainCoupon from '../components/MainCoupon';
import { apis } from "../common/axios";

const SearchList = () => {
    
    const [search,setSearch] = useState([]);

    const getSearch = useCallback(async(val) => {
        try{
            const search_result = await apis.searchCoupon(val);
            console.log(search_result.data)
            if(search_result.data.result === "failed"){
                setSearch([]);
            }else if(search_result.data.result === "success"){
                setSearch(search_result.data.data);
            }
        }catch(e){
            console.log('에러');
        }
    },[search])

    React.useEffect(()=>{
        const val = localStorage.getItem("search");
        getSearch(val);
        
    },[getSearch]);
    
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