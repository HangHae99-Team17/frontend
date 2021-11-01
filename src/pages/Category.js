import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { categoryCreators } from '../redux/modules/category';
import Categorys from '../components/Categorys';

const Category = (props) => {
    const dispatch = useDispatch();
    const Type = props.match.params.type;
    const categorys = useSelector((state) => state.category.list);
    

    useEffect(() => {
        dispatch(categoryCreators.getCategoryMiddleware(Type));
      }, []);

    return (
        <React.Fragment>
          <div>
          {categorys.map((category) => {
            return (
              <Categorys key={category.id} {...category}/>
            );
          })}
          </div>
        </React.Fragment>
    );
};

export default Category;