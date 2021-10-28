import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { categoryCreators } from '../redux/modules/category';

const Category = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.list);
    
    useEffect(() => {
        dispatch(categoryCreators.getCategoryMiddleware());
      }, []);

    return (
        <React.Fragment>
          
          {category &&
          category.map((item) => {
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

export default Category;