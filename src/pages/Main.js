import React from "react";
import styled from "styled-components";
import { MainBackground } from "../image";
import RankList from '../components/RankList';

const Main = () => {

  return (
    <div>
      <Banner src={MainBackground}/>
      <RankList/>
    </div>
  );
};

const Banner = styled.img`
width : 100%;
height : 200px;
margin-bottom : 30px;
@media screen and (min-width: 1028px) {
  width: 100%;
  height : auto;
  top: -35px;
  position: relative;  
  display: block;
}
`
export default Main;