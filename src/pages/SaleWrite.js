import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux"; 
import DatePicker from "react-datepicker";
import Upload from "../shared/Upload";
import "react-datepicker/dist/react-datepicker.css";
import { actionCreators as saleActions } from "../redux/modules/sale";
import { actionCreators as imageActions } from "../redux/modules/image";
import { history } from "../redux/configureStore";
import styled from 'styled-components';
import InterType from '../components/InterType';

const SaleWrite = (props) => {

    const dispatch = useDispatch();
    const sale_id = props.match.params.id;
    const editmode = sale_id ? true : false;
    const preview = useSelector((state) => state.image.preview);
    const sale_list = useSelector((state) => state.sale.list);
    const _sale = editmode ? sale_list.find((p) => p.id.toString() === sale_id): null;
    const [sale_info, setSale_Info] = useState({
        couponbrand: _sale?_sale.couponBrand:"",
        couponsubtitle: _sale?_sale.couponSubTitle:"",
        couponlogo: _sale?_sale.couponLogo:"",
        coupontitle: _sale?_sale.couponTitle:"",
        coupondesc:_sale?_sale.couponDesc:"",
        couponurl: _sale?_sale.couponUrl:"",
    });
    const [coupontype, setCouPonType] = useState(_sale?_sale.couponType:"") 
    const [startDate, setStartDate] = useState(_sale?new Date(_sale.couponCreate):new Date());
    const [endDate, setEndDate] = useState(_sale?new Date(_sale.couponDespire):new Date());
    const [categorydisplay,setCateGoryDisplay] = useState("block");
    const [saleinfodisplay,setSaleInfoDisplay] = useState("none");


    const onChange = (e) => {
        setSale_Info({...sale_info, [e.target.name]: e.target.value});
    };

    const {coupontitle, coupondesc, couponurl , couponbrand, couponsubtitle, couponlogo} = sale_info;

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    };

    const categoryselect = (e) => {
        console.log(e.target.value)
        if(e.target.value === coupontype){
            setCouPonType("")
        }else{
            setCouPonType(e.target.value);
        }
    }

    const next = () =>{
        if(categorydisplay === "block"){
            setCateGoryDisplay("none");
            setSaleInfoDisplay("block");
        }
    }

    const inputSale = () => {
        const sale_content = {
            couponBrand: couponbrand,
            couponSubTitle: couponsubtitle,
            couponLogo: couponlogo,
            couponType: coupontype,
            couponTitle: coupontitle,
            couponDesc: coupondesc,
            couponUrl: couponurl,
            couponCreate: dateToString(startDate),
            couponDespire: dateToString(endDate)
        }

        if(!editmode){
            dispatch(saleActions.addSaleFB(sale_content));
        }else{
            dispatch(saleActions.editSaleFB(sale_id,sale_content));
        }
    };
    
    useEffect(()=>{
        if(editmode && !_sale){
            window.alert("포스트 정보가 없어요!");
            history.goBack();
            return;
        }
        if (editmode) {
            dispatch(imageActions.setPreview(_sale.couponImage));
        }
    },[]);

    return (
        <React.Fragment>
            <SaleWriteBox>
                <CateGoryBox display={categorydisplay}>
                    <p>카테고리를 선택해주세요.</p>
                    <InterType mode="saleinfo" coupontype={coupontype} categoryselect={categoryselect}/>
                    <button onClick={next}>완료</button>
                </CateGoryBox>
                <SaleInfoBox display={saleinfodisplay}>
                <div>
                <p>대표 이미지를 등록해주세요.</p>
                <img src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                <Upload />
            </div>
            <div>
                <p>정보를 입력해주세요.</p>
                <p>제목을 입력해주세요</p>
                <input type="text" name="coupontitle" value={coupontitle} onChange={onChange}/>
                <p>쿠폰서브타이틀</p>
                <input type="text" name="couponsubtitle" value={couponsubtitle} onChange={onChange}/>
                <p>브랜드이름</p>
                <input type="text" name="couponbrand" value={couponbrand} onChange={onChange}/>
                <p>로고URL</p>
                <input type="text" name="couponlogo" value={couponlogo} onChange={onChange}/>
                <p>쿠폰내용을 입력하세요.</p>
                <input type="text" name="coupondesc" value={coupondesc} onChange={onChange}/>
            </div>
            <div>
                <p>링크를 입력해주세요.</p>
                <input type="text" name="couponurl" value={couponurl} onChange={onChange}/>
            </div>
            <div>
                <p>쿠폰 유효기간</p>
                시작
                <DatePicker dateFormat="yyyy/MM/dd" name="startDate" selected={startDate} onChange={date => setStartDate(date)}/>
                마감
                <DatePicker dateFormat="yyyy/MM/dd" name="endDate" selected={endDate} onChange={date => setEndDate(date)}/>
            </div>
            <div>
                {editmode?(<button onClick={inputSale}>할인정보수정</button>):(<button onClick={inputSale}>할인정보입력</button>)}
            </div>
                </SaleInfoBox>
            </SaleWriteBox>
        </React.Fragment>
    );
};

const SaleWriteBox = styled.div`
    
`;

const CateGoryBox = styled.div`
    display: ${props => props.display};
`;

const SaleInfoBox = styled.div`
    display: ${props => props.display};
`;


export default SaleWrite;