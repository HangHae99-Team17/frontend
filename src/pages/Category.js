import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { categoryCreators } from '../redux/modules/category';
import Category2 from '../components/Category2';

const Category = () => {
    const dispatch = useDispatch();
    const categorys = useSelector((state) => state.category.list);

    useEffect(() => {
        dispatch(categoryCreators.getCategoryMiddleware());
      }, []);

    return (
        <React.Fragment>
          <div>
          {categorys.map((category) => {
            return (
              <Category2 key={category.id} {...category}/>
            );
          })}
          </div>
        </React.Fragment>
    );
};

export default Category;