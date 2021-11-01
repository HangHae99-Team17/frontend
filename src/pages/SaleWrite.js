import React,{useState} from 'react';
import {useDispatch} from "react-redux"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { actionCreators as saleActions } from "../redux/modules/sale";

const SaleWrite = () => {

    const dispatch = useDispatch();
    const [sale_info, setSale_Info] = useState({
        couponimg: "",
        coupontype: "",
        coupontitle: "",
        coupondesc:"",
        couponurl: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onChange = (e) => {
        setSale_Info({...sale_info, [e.target.name]: e.target.value});
    }

    const {couponimg, coupontype, coupontitle, coupondesc, couponurl} = sale_info;

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    const addSale = () => {
        const sale_content = {
            couponImage: couponimg,
            couponType: coupontype,
            couponTitle: coupontitle,
            couponDesc: coupondesc,
            couponUrl: couponurl,
            couponCreate: dateToString(startDate),
            couponDespire: dateToString(endDate)
        }
        dispatch(saleActions.addSaleFB(sale_content));
    }

    return (
        <div>
            <h3>할인정보입력</h3>
            <p>쿠폰이미지</p>
            <input type="text" name="couponimg" value={couponimg} onChange={onChange}/>
            <p>쿠폰타입</p>
            <input type="text" name="coupontype" value={coupontype} onChange={onChange}/>
            <p>쿠폰타이틀</p>
            <input type="text" name="coupontitle" value={coupontitle} onChange={onChange}/>
            <p>쿠폰설명</p>
            <input type="text" name="coupondesc" value={coupondesc} onChange={onChange}/>
            <p>쿠폰URL</p>
            <input type="text" name="couponurl" value={couponurl} onChange={onChange}/>
            <p>쿠폰 유효기간</p>
            시작
            <DatePicker dateFormat="yyyy/MM/dd" name="startDate" selected={startDate} onChange={date => setStartDate(date)}/>
            마감
            <DatePicker dateFormat="yyyy/MM/dd" name="endDate" selected={endDate} onChange={date => setEndDate(date)}/>
            <div>
                <button onClick={addSale}>할인정보입력</button>
            </div>
        </div>
    );
};

export default SaleWrite;