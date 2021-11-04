import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { foldersCreators } from '../redux/modules/folders';
import { history } from '../redux/configureStore'

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
                <div>
                  {item.couponTitle}
                  <button onClick={()=>{dispatch(foldersCreators.delFoldersMiddleware(item.couponId)); history.go(0)}}>삭제하기</button>
                </div>
              )

            })}
          </div>
    );
};

export default Folders;