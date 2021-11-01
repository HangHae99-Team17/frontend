import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { categoryCreators } from '../redux/modules/category';
import Category2 from '../components/Category2';

const Category = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.list);
    const [title, setTitle] = useState('');


    console.log(category.data)
    
    useEffect(() => {
        dispatch(categoryCreators.getCategoryMiddleware());
        setTitle(category)
      }, [category]);

    return (
        <React.Fragment>
          <div>
            
          
          {title.map((item) => {
            return (
              <Category2 {...item}/>
              
            );
          })}
          </div>
        </React.Fragment>
    );
};

export default Category;