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
import Button from "../elements/Button"

const SaleWrite = (props) => {

    const dispatch = useDispatch();
    const sale_id = props.match.params.id;
    const editmode = sale_id ? true : false;
    const preview = useSelector((state) => state.image.preview);
    const sale_list = useSelector((state) => state.sale.list);
    const _sale = editmode ? sale_list.find((Notice) => Notice.id.toString() === sale_id): null;
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
                    <CategoryNotice>카테고리를 선택해주세요.</CategoryNotice>
                    <InterType mode="saleinfo" coupontype={coupontype} categoryselect={categoryselect}/>
                    <CategoryButton onClick={next}>선택 완료</CategoryButton>
                </CateGoryBox>

                <SaleInfoBox display={saleinfodisplay}>
                <div>
                <Notice>대표 이미지를 등록해주세요.</Notice>
                <Img src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                <Upload />
            </div>
            <div>
                <Notice>정보를 입력해주세요.</Notice>
                <Input type="text" required="required" name="coupontitle" placeholder="제목을 입력해 주세요" value={coupontitle} onChange={onChange}/>
                <Input type="text" required="required" name="couponsubtitle" placeholder="쿠폰 서브타이틀을 입력해주세요" value={couponsubtitle} onChange={onChange}/>
                <InputSmall type="text" required="required" name="couponbrand" placeholder="브랜드 이름" value={couponbrand} onChange={onChange}/>
                <InputSmall type="text" required="required" name="couponlogo" placeholder="로고 URL" value={couponlogo} onChange={onChange}/>
                <InputDesc type="text" required="required" name="coupondesc" value={coupondesc} placeholder="쿠폰내용을 입력하세요" onChange={onChange}/>
                <Input type="text" required="required" name="couponurl" value={couponurl} placeholder="링크를 입력해주세요" onChange={onChange}/>
            </div>
            <div>
                <Notice>쿠폰 유효기간</Notice>
                시작
                <DatePicker dateFormat="yyyy/MM/dd" name="startDate" selected={startDate} onChange={date => setStartDate(date)}/>
                마감
                <DatePicker dateFormat="yyyy/MM/dd" name="endDate" selected={endDate} onChange={date => setEndDate(date)}/>
            </div>
            <div>
                {editmode?(<Button bg="#FF8F00" color="white" margin="20px 0" _onClick={inputSale}>할인정보수정</Button>):(<Button bg="#FF8F00" color="white" margin="20px 0" _onClick={inputSale}>할인정보입력</Button>)}
            </div>
                </SaleInfoBox>
            </SaleWriteBox>
        </React.Fragment>
    );
};

const SaleWriteBox = styled.div`
    width:100%;
`;

const CateGoryBox = styled.div`
    display: ${props => props.display};
`;


const CategoryNotice = styled.p`
font-weight:bold;
margin:15px auto;
width:90%;
`
const CategoryButton = styled.div`
font-weight:bold;
margin:10px auto;
width:90%;
height:38px;
border-radius:5px;
line-height:36px;
text-align:center;
background-color:#FF8F00;
color:white;
`

const Notice = styled.p`
font-weight:bold;
margin:15px auto;
width:100%;
`

const SaleInfoBox = styled.div`
width:320px;
margin:0 auto;
    display: ${props => props.display};
`;

const Input = styled.input`
width:98%;
color:#FF8F00;
border:none;
border-bottom:1px solid #E4E4E4;
height:30px;
margin:6px 0;
:valid{
        outline:none;
        border-bottom:1px solid #FF8F00;
}
`;

const InputSmall = styled.input`
width:43%;
color:#FF8F00;
border:none;
border-bottom:1px solid #E4E4E4;
height:30px;
margin:5px 18px 5px 0px;
:valid{
    outline:none;
    border-bottom:1px solid #FF8F00;
}
`;

const InputDesc = styled.textarea`
width:98%;
color:#FF8F00;
border:none;
border-bottom:1px solid #E4E4E4;
height:30px;
margin:10px 0;
line-height:20px;
height:140px;
:focus{
    outline:none;
    border-bottom:1px solid #FF8F00;
}
:valid{
    outline:none;
    border-bottom:1px solid #FF8F00;
}
`;

const Img = styled.img`
width:100px;
height:100px;
margin-bottom:10px;
border-radius:6px;
`;


export default SaleWrite;