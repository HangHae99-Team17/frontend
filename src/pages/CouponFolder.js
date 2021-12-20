import React, { useEffect, useState } from 'react';
import { history } from '../redux/configureStore';
import styled from "styled-components";
import Grid from "../elements/Grid";
import {fullBookmark} from '../image';
import { apis } from "../common/axios";


const CouponFolder = () => {
    const [list,setList] = useState([])

    // 보관함 리스트 가지고 오기
    useEffect(async () => {
      try{
        const list = await apis.getFolders();
        console.log(list.data.coupons)
        setList(list.data.coupons); }
        catch (e) {console.log("보관함 에러발생!")}
      }, []);

    return (
      <React.Fragment>
        <AllBox>
          <Notice>{list?.length}개가 보관되어있어요</Notice>
            {list?.map((item)=>{
              return(
                <Grid key={item.id} margin="0 auto" width="375px" padding="10px 0"> 
                {item.couponAlert===1?
                <div>
                  <DesCouponBox>
                    <SoonDes>오늘이 마감이에요!</SoonDes>
                    <GoDetail onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                    <Img ><img width="40px" src={item.couponLogo}/></Img>
                    <Textbox>
                      <P1>{item.couponBrand} 에서</P1>
                      <P2>{item.couponSubTitle} 할인 받기</P2>
                    </Textbox>
                    </GoDetail>

                {/* 찜한 쿠폰 보관함에서 삭제하기 */}
                  <DesBUTTON onClick={async()=>{
                    const del = await apis.delFolders(item.id);
                  }}><img src={fullBookmark} /></DesBUTTON>
                  </DesCouponBox>

                </div>
                :
                  <Couponbox>
                    <GoDetail onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                    <Img ><img width="40px" src={item.couponLogo}/></Img>
                    <Textbox>
                      <P1>{item.couponBrand} 에서</P1>
                      <P2>{item.couponSubTitle} 할인 받기</P2>
                    </Textbox>
                    </GoDetail>

                {/* 찜한 쿠폰 보관함에서 삭제하기 */}
                  <BUTTON onClick={async()=>{
                    const del = await apis.delFolders(item.id)
                  }}><img src={fullBookmark} /></BUTTON>
                  </Couponbox>
                  }
                </Grid>
              )
          })}
        </AllBox>
      </React.Fragment>
    );
};


const AllBox = styled.div`
position:relative;
width:375px;
margin:0px auto;
@media screen and (min-width:1028px){
}

`

const Notice = styled.div`
font-weight: bold;
font-size:18px;
padding: 10px 18px;
`

const Couponbox = styled.div`
display:flex;
flex-flow:colums wrap;
width : 360px;
height: 60px;
margin-top:5px;
cursor:pointer;
`
const SoonDes = styled.div`
font-size : 13px;
font-weight : 600;
color : red;
margin : 2px 0 4px 15px;
`
const DesCouponBox = styled.div`
width : 360px;
height : 90px;
border : 2px solid red;
position : relative;
margin : auto;
border-radius : 0 15px 15px 15px;
`
const DesBUTTON = styled.button`
position: absolute;
top : 20px;
right: 3px;
height: 50px;
border: none;
background-color:white;
cursor:pointer;
`

const GoDetail = styled.div`
display : flex;
`
const Img = styled.div`
position:relative;
top:12px;
width:50px;
padding-left:20px;
`

const Textbox = styled.div`
width:200px;
padding-left:10px;
`


const P1 = styled.p`
margin-top: 0px;
font-size: 16px;
`
const P2 = styled.p`
margin-top: -5px;
font-size:16px;
padding-left:-20px;
width:260px;
color: #f09643;
`

const BUTTON = styled.button`
position: absolute;
right:10px;
height: 50px;
border: none;
background-color:white;
cursor:pointer;
`

export default CouponFolder;