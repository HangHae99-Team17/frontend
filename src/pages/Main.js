import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

const Main = ()=>{
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(listCreators.getDcListMW())
    },[])

    const list = useSelector((state)=>state.main.rank.data)
    console.log(list)
    return(
        <div>
            <P>아는만큼</P>
            <P>아낄 수 있게</P>
            {list?.map((item)=>{
                return(
                <Box onClick={()=>{history.push(`api/detail/${item.id}`)}}>
                    <ImgBox>Img</ImgBox>
                    <div>
                    <p>{item.couponTitle}</p>
                    <p>{item.couponDesc}</p>
                    </div>
                    </Box>
            );
            })}
        </div>
    )
}

const P = styled.p`
margin : 5px 0 0 0;
font-size : 18px;
font-weight : 400;
`
const Box = styled.div`
width : 250px;
height : 80px;
border : 1px solid black;
display : flex;
margin : 10px auto;
`
const ImgBox = styled.div`
width : 50px;
height : 50px;
border : 1px solid black;
margin : 15px;
`
export default Main;