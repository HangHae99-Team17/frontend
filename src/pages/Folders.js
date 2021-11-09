import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { foldersCreators } from '../redux/modules/folders';
import { history } from '../redux/configureStore';
import styled from "styled-components";
import Grid from "../elements/Grid";
import Button from "../elements/Button";


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
                <Grid 
                margin="0 auto"
                width="375px"
                padding="10px 0"
                > 
                  <Couponbox>{item.couponTitle}
                  <button
                  onClick={()=>{dispatch(foldersCreators.delFoldersMiddleware(item.couponId)); history.go(0)}}>삭제하기</button>
                  </Couponbox>
                </Grid>
              )
            })}
          </div>
    );
};

const Couponbox = styled.div`
display:flex;
justify-content: space-between;
width : 375px;
`

export default Folders;