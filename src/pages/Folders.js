import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { foldersCreators } from '../redux/modules/folders';
import Folder from '../components/Folder';

const Folders = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folders.list);

    useEffect(() => {
        dispatch(foldersCreators.getFoldersMiddleware());
      }, []);

      return (
        <React.Fragment>
          <div>
          </div>
        </React.Fragment>
    );
};

export default Folders;