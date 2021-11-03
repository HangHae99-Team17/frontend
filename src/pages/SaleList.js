import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as saleActions } from "../redux/modules/sale";
import Coupon from '../components/Coupon';

const SaleList = (props) => {

    const dispatch = useDispatch();
    const sale_list = useSelector((state) => state.sale.list);

    useEffect(()=>{
        dispatch(saleActions.setSaleFB());
    },[])

    return (
        <React.Fragment>
            <h3>쿠폰목록</h3>
            {sale_list.map((sale) => {
                return(
                    <Coupon key={sale.id} {...sale}/>
                )
            })}
        </React.Fragment>
    );
};

export default SaleList;