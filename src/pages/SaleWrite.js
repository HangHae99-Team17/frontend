import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { actionCreators as saleActions } from "../redux/modules/sale";
import { history } from "../redux/configureStore";

const SaleWrite = (props) => {

    const dispatch = useDispatch();
    const sale_id = props.match.params.id;
    const editmode = sale_id ? true : false;
    const sale_list = useSelector((state) => state.sale.list);
    const _sale = editmode ? sale_list.find((p) => p.id.toString() === sale_id): null;
    const [sale_info, setSale_Info] = useState({
        couponbrand: _sale?_sale.couponBrand:"",
        couponsubtitle: _sale?_sale.couponSubTitle:"",
        couponlogo: _sale?_sale.couponLogo:"",
        couponimg: _sale?_sale.couponImage:"",
        coupontype: _sale?_sale.couponType:"",
        coupontitle: _sale?_sale.couponTitle:"",
        coupondesc:_sale?_sale.couponDesc:"",
        couponurl: _sale?_sale.couponUrl:"",
    });

    const [startDate, setStartDate] = useState(_sale?new Date(_sale.couponCreate):new Date());
    const [endDate, setEndDate] = useState(_sale?new Date(_sale.couponDespire):new Date());
    
    const onChange = (e) => {
        setSale_Info({...sale_info, [e.target.name]: e.target.value});
    };

    const {couponimg, coupontype, coupontitle, coupondesc, couponurl , couponbrand, couponsubtitle, couponlogo} = sale_info;

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    };

    const addSale = () => {
        const sale_content = {
            couponBrand: couponbrand,
            couponSubTitle: couponsubtitle,
            couponLogo: couponlogo,
            couponImage: couponimg,
            couponType: coupontype,
            couponTitle: coupontitle,
            couponDesc: coupondesc,
            couponUrl: couponurl,
            couponCreate: dateToString(startDate),
            couponDespire: dateToString(endDate)
        }
        dispatch(saleActions.addSaleFB(sale_content));
    };

    const editSale = () => {
        const sale_content = {
            couponBrand: couponbrand,
            couponSubTitle: couponsubtitle,
            couponLogo: couponlogo,
            couponImage: couponimg,
            couponType: coupontype,
            couponTitle: coupontitle,
            couponDesc: coupondesc,
            couponUrl: couponurl,
            couponCreate: dateToString(startDate),
            couponDespire: dateToString(endDate)
        }
        dispatch(saleActions.editSaleFB(sale_id,sale_content));
        history.goBack();
    }
    
    useEffect(()=>{
        if(editmode && !_sale){
            window.alert("포스트 정보가 없어요!");
            history.goBack();
            return;
        }
    },[]);

    return (
        <div>
            <h3>할인정보입력</h3>
            <p>쿠폰브랜드</p>
            <input type="text" name="couponbrand" value={couponbrand} onChange={onChange}/>
            <p>쿠폰타이틀</p>
            <input type="text" name="coupontitle" value={coupontitle} onChange={onChange}/>
            <p>쿠폰서브타이틀</p>
            <input type="text" name="couponsubtitle" value={couponsubtitle} onChange={onChange}/>
            <p>쿠폰이미지</p>
            <input type="text" name="couponimg" value={couponimg} onChange={onChange}/>
            <p>쿠폰로고</p>
            <input type="text" name="couponlogo" value={couponlogo} onChange={onChange}/>
            <p>쿠폰타입</p>
            <input type="text" name="coupontype" value={coupontype} onChange={onChange}/>
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
                {editmode?(<button onClick={editSale}>할인정보수정</button>):(<button onClick={addSale}>할인정보입력</button>)}
            </div>
        </div>
    );
};

export default SaleWrite;