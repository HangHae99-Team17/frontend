import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { foldersCreators } from '../redux/modules/folders';

const Folders = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folders.list);

    useEffect(() => {
        dispatch(foldersCreators.getFoldersMiddleware());
      }, []);

    return (
        <React.Fragment>
          {folders &&
          folders.map((item) => {
            return (
              <div key={item.id}>
                <h3>{item.couponId}</h3>
                <p>{item.couponimage}</p>
                <p>{item.type}</p>
                <p>{item.title}</p>
                <p>{item.couponcreate}</p>
                <p>{item.coupondespire}</p>
              </div>
            );
          })}

        </React.Fragment>
    );
};

export default Folders;