import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as foldersCreators} from '../redux/modules/salebox';
import { history } from '../redux/configureStore';
import styled from "styled-components";
import Grid from "../elements/Grid";
import {fullBookmark} from '../image'

const SaleBox = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.salebox.list);
    const list_length = folders?.length;
    
    useEffect(() => {
      dispatch(foldersCreators.getFoldersMiddleware());
    }, []);

    return (
      <React.Fragment>
        <AllBox>
          <Notice>{list_length}개가 보관되어있어요</Notice>
            {folders?.map((item)=>{
              return(
                <Grid key={item.id} margin="0 auto" width="375px" padding="10px 0"> 
                  <Couponbox>

                    <Img onClick={()=>{history.push(`/api/detail/${item?.id}`)}}><img width="40px" src={item.couponLogo}/></Img>
                    <Textbox onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                      <P1>{item.couponBrand}에서</P1>
                      <P2>{item.couponSubTitle} 할인 받기</P2>
                    </Textbox>

                  <BUTTON onClick={()=>{
                    dispatch(foldersCreators.delFoldersMiddleware(item.id));
                  }}><img src={fullBookmark} /></BUTTON>
                  </Couponbox>
                </Grid>
              )
          })}
        </AllBox>
      </React.Fragment>
    );
};


const AllBox = styled.div`
position:relative;
width:375px;
margin:10px auto;
@media screen and (min-width:1028px){
}

`

const Notice = styled.div`
font-weight: bold;
font-size:18px;
padding: 10px 18px;
`

const Couponbox = styled.div`
display:flex;
flex-flow:colums wrap;
width : 375px;
height: 60px;
margin-top:5px;
`
const Img = styled.div`
position:relative;
top:12px;
width:50px;
padding-left:20px;
`

const Textbox = styled.div`
width:200px;
padding-left:10px;
`


const P1 = styled.p`
margin-top: 0px;
font-size: 14px;
`
const P2 = styled.p`
margin-top: -5px;
font-size:15px;
font-weight: bold;
padding-left:-20px;
width:250px;
`

const BUTTON = styled.button`
position: absolute;
right:10px;
height: 50px;
border: none;
background-color:white;
`

export default SaleBox;