import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { foldersCreators } from '../redux/modules/folders';
import { history } from '../redux/configureStore'
import styled from 'styled-components';
import Grid from "../elements/Grid"

const Folders = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folders.list);
    console.log(folders?.data?.coupons);
    const list = folders?.data?.coupons;

    useEffect(() => {
        dispatch(foldersCreators.getFoldersMiddleware());
      }, []);

      return (
          <div>
            {list?.map((item)=>{
              return(
                <Grid bg="red">
                  <Div>
                  {item.couponTitle}
                  <button onClick={()=>{dispatch(foldersCreators.delFoldersMiddleware(item.couponId)); history.go(0)}}>삭제하기</button>
                  </Div>
                </Grid>
              )

            })}
          </div>
    );
};

const Div = styled.div`
display:flex;
margin: 0 auto;
width:750px;
height:600px;
background-color:black;
`

export default Folders;